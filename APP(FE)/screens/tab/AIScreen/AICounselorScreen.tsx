import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import {ANSWER} from	'@constants/AI/answer'
import { QUESTION } from '@constants/AI/question'
import {FONT} from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {atom, useAtom} from 'jotai'
import React from 'react'
import { Text, TouchableOpacity,View } from 'react-native'

import { AINaviParamList } from './AINavigator'
type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AICounselor'
>
const QueryAtom = atom(0);
const SelectAtom = atom([[],[],[],[],[]]);
const AICounselorScreen: React.FC = () => {
	const [query, setQuery] = useAtom(QueryAtom);
	const [select, setSelect] = useAtom(SelectAtom);
	
	
	const selection = (q : number, idx : number) =>{
		// eslint-disable-next-line camelcase
		let newselect = JSON.parse(JSON.stringify(select));
		if(q===0 || q===4){
			//can select multiple answer
			newselect[q].indexOf(idx)!=-1 ? newselect[q].splice(newselect[q].indexOf(idx),1) : newselect[q].push(idx);

		}else{
			//can select only one answer
			newselect[q] = newselect[q].some((i:number) => i === idx) ? [idx] : []
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
							if(query > 0) setQuery(q => q-1)
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
							
						`}>{QUESTION[query]}</Text>

						{ANSWER[query].map((ans,idx)=> 
						<TouchableOpacity key = {idx} onPress = {()=>selection(query,idx)}>
							<Text key = {idx} style = {css`
								font-family : ${FONT.Pretendard.REGULAR};
								font-size : 20px;
								font-weight : 500;
								padding : 5px;
								margin: 3px;
								backgroundColor : ${select[query].some((i:number)=>i===idx) ? 'orange' : 'white'};
							`}>{ans}</Text>
						</TouchableOpacity>)}

					</View>
					<View style = {css`
						flex : 1;
						align-items : center;
						justify-content : center;
					`}>
						<TouchableOpacity onPress={()=>{
							if(query<QUESTION.length-1) setQuery((q)=>q+1)
						}}><Text>다음</Text></TouchableOpacity>
					</View>
				</View>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AICounselorScreen