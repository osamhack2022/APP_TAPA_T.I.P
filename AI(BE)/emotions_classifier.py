import gluonnlp as nlp
import numpy as np
import torch
from kobert import get_pytorch_kobert_model
from kobert import get_tokenizer
from torch import nn
from torch.utils.data import Dataset
import torch.nn.functional as F
import nltk

nltk.download("punkt")


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


bertmodel, vocab = get_pytorch_kobert_model(cachedir=".cache")
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)
model.load_state_dict(torch.load("./model/emotions.pth", map_location=device))
max_len = 64
batch_size = 64
tokenizer = get_tokenizer()
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
        out = model(token_ids, valid_length, segment_ids)\

        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()
            logits = torch.from_numpy(logits)
            prob = F.softmax(logits, dim=0)
            return prob

    return [0, 0, 0, 0, 0, 0]


# [0. 기쁨, 1. 불안, 2. 당황, 3. 분노, 4. 상처, 5 슬픔]
weights = [-2.0, 1.5, 0.5, 2, 2.5, 0.5]
max_weighted_score = max(weights)


def calculate_weighted_score(avg_scores):
    weighted_score = 0

    for idx, score in enumerate(avg_scores):
        weighted_score += weights[idx] * score

    return weighted_score / max_weighted_score


def predict_text(text):
    sentences = nltk.sent_tokenize(text)
    sums = np.array([0.0, 0.0, 0.0, 0.0, 0.0, 0.0])

    for s in sentences:
        prob = predict(s).detach().cpu().numpy()
        sums = np.add(sums, prob)

    sums /= len(sentences)
    return sums


emotions = ["happiness", "anxious", "surprise", "anger", "hurt", "sadness"]


def get_top_emotion_from(avg_scores):
    return emotions[np.argmax(avg_scores)]

