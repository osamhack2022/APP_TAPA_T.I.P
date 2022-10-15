import gluonnlp as nlp
import numpy as np
import torch
from kobert import get_pytorch_kobert_model
from kobert import get_tokenizer
from torch import nn
from torch.utils.data import Dataset


class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len,
                 pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i],))

    def __len__(self):
        return (len(self.labels))


class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size=768,
                 num_classes=6,
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size, num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids=token_ids, token_type_ids=segment_ids.long(),
                              attention_mask=attention_mask.float().to(token_ids.device))
        if self.dr_rate:
            out = self.dropout(pooler)
        else:
            out = pooler
        return self.classifier(out)


device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = torch.load("./model/emotions_model.pt", map_location=device)
max_len = 64
batch_size = 64
tokenizer = get_tokenizer()
vocab = get_pytorch_kobert_model(cachedir=".cache")[1]
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)


def predict(predict_sentence):
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)

    model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length = valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)
        # 0 기쁨 1 불안 2 당황 3 분노 4 상처 5 슬픔

        test_eval = []

        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()

            if np.argmax(logits) == 0:
                test_eval.append("기쁨이")
            elif np.argmax(logits) == 1:
                test_eval.append("불안이")
            elif np.argmax(logits) == 2:
                test_eval.append("당황이")
            elif np.argmax(logits) == 3:
                test_eval.append("분노가")
            elif np.argmax(logits) == 4:
                test_eval.append("상처가")
            elif np.argmax(logits) == 5:
                test_eval.append("슬픔이")

        print(">> 입력하신 내용에서 " + test_eval[0] + " 느껴집니다.")


end = 1
while end == 1:
    sentence = input("하고싶은 말을 입력해주세요 : ")
    if sentence == "0":
        break
    predict(sentence)
    print("\n")
