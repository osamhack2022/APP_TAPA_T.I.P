import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import TPButton from '@components/TPButton'
import {ANSWER} from	'@constants/AI/answer'
import { QUESTION } from '@constants/AI/question'
import {COLOR} from '@constants/color'
import {FONT} from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {atom, useAtom} from 'jotai'
import React from 'react'
import { Image,Text, TouchableOpacity,View } from 'react-native'

import { AINaviParamList } from './AINavigator'
type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AICounselor'
>
const QueryAtom = atom(0);
const SelectAtom = atom([-1, -1, -1, -1, -1]);

const AICounselorScreen: React.FC = () => {
	const [query, setQuery] = useAtom(QueryAtom);
	const [select, setSelect] = useAtom(SelectAtom);
	
	
	const selection = (q : number, idx : number) =>{
		// eslint-disable-next-line camelcase
		let newselect = JSON.parse(JSON.stringify(select));
			//can select only one answer
			newselect[q] = newselect[q]===idx ? -1 : idx;
		setSelect(newselect);
	}
	const navigation = useNavigation<NavigationProp>()
	const MoveCounselorScreen = ()=>{
		navigation.pop();
		navigation.navigate('AIResult', {answer : select});
		setSelect([-1,-1,-1,-1,-1]);
		setQuery(0);
	}
	
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
					padding-top : 10px;
				`}>
					<Image source = {require('../../../assets/AI/AIRobotImage.png')}
					style={{
						height : 200,
						aspectRatio : 0.825
					}}
				
				></Image>
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
						{query>0?
						<TouchableOpacity onPress ={()=>{
							setQuery(q => q-1)
						}}><Text>이전</Text></TouchableOpacity> : null}
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
						<TouchableOpacity key = {idx} onPress = {()=>selection(query,idx)}
							
						>
							<Text key = {idx} style = {css`
								font-family : ${FONT.Pretendard.REGULAR};
								font-size : 20px;
								font-weight : 500;
								padding : 5px;
								margin: 3px;
								
								backgroundColor : ${select[query]===idx ? COLOR.BRAND.TINT(3) : 'white'};
							`}>{ans}</Text>
						</TouchableOpacity>)}

					</View>
					<View style = {css`
						flex : 1;
						align-items : center;
						justify-content : center;
					`}>
						{query<QUESTION.length-2 ? 
						<TouchableOpacity onPress={()=>{
							setQuery((q)=>q+1)
						}}
						disabled = {select[query]===-1}
						><Text >다음</Text></TouchableOpacity>:
						 <TouchableOpacity onPress ={MoveCounselorScreen}
						disabled = {select[query]===-1}>
						
							<Text>제출</Text>	
						</TouchableOpacity>}
						

					</View>
				</View>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AICounselorScreen