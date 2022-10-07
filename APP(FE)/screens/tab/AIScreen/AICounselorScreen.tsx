import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import {FONT} from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Text, TouchableOpacity,View } from 'react-native'

import { AINaviParamList } from './AINavigator'


type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AICounselor'
>
const AICounselorScreen: React.FC = () => {
	const [query, setQuery] = useState(0);
	const [select, setSelect] = useState([[],[],[],[],[]]);
	const question = [
		"당한 가혹행위의 종류가 무엇인가요?",
		"가혹행위를 얼마나 자주 당했나요?",
		"상대방은 본인과 어떤 관계인가요?",
		"가혹행위를 당했을 때 느낀 감정은 어떘나요?",
		"앞으로 상대방과 어떤 관계로 남고 싶나요?" , 
	];
	const answer = [
		["폭행", "폭언", "따돌림", "금품갈취", "협박", "감금"],
		["한달에 1번", "한달에 2번", "일주일에 1번", "일주일에 2번", "일주일에 3번", "매일"],
		["선임", "후임", "간부"],
		["우울감에 빠졌다", "상대방에게 되갚아주고 싶었다", "죽고 싶었다", "탈영하고 싶었다"],
		["좋은 사이가 되고 싶다", "좋은 사이는 어렵지만, 나쁘지 않은 사이로 지내고 싶다","서로 신경쓰고 싶지 않다", "상대방과 앞으로 마주치고 싶지 않다"]
	];
	const selection = (q : number, idx : number) =>{
		// eslint-disable-next-line camelcase
		let newselect = JSON.parse(JSON.stringify(select));
		if(q===0 || q===3){
			//can select multiple answer
			newselect[q].indexOf(idx)!=-1 ? newselect[q].splice(newselect[q].indexOf(idx),1) : newselect[q].push(idx);

		}else{
			//can select only one answer
			if(newselect[q].indexOf(idx)!=-1) newselect[q] = [];
			else newselect[q]=[idx];
		}
		setSelect(newselect);
	}
	const navigation = useNavigation<NavigationProp>()
	return (
		<>    
			<View style={css`
				flex : 1;
				justify-content : center;
				align-items : center;
			`}>
				<View style = {css`
					flex : 1;
					justify-content : center;
				`}>
					<Text>Robot IMG</Text>
				</View>
				
				<View style = {css`
					flex : 2;
					flex-direction : row;
					align-items : center;
				`}>
					<View style = {css`
						flex : 1;
						align-items: center;
						justify-content : center;
					`}>
						<TouchableOpacity onPress ={()=>{
							query > 0 ? setQuery((q) =>q-1) : null
						}}><Text>이전</Text></TouchableOpacity>
					</View>
					<View style = {css`
						flex : 5;
					`}>
						<Text style = {css`
							
							font-family : ${FONT.Pretendard.REGULAR};
							font-size : 25px;
							font-weight : 700;
							padding : 10px;
							
						`}>{question[query]}</Text>

						{answer[query].map((ans,idx)=> 
						<TouchableOpacity key = {idx} onPress = {()=>selection(query,idx)}>
							<Text key = {idx} style = {css`
								font-family : ${FONT.Pretendard.REGULAR};
								font-size : 20px;
								font-weight : 500;
								padding : 5px;
								margin: 3px;
								backgroundColor : ${select[query].indexOf(idx as never)==-1 ? 'white' : 'orange'};
							`}>{ans}</Text>
						</TouchableOpacity>)}

					</View>
					<View style = {css`
						flex : 1;
						align-items : center;
						justify-content : center;
					`}>
						<TouchableOpacity onPress={()=>{
							query<question.length-1 ?  setQuery((q)=>q+1): null
						}}><Text>다음</Text></TouchableOpacity>
					</View>
				</View>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AICounselorScreen