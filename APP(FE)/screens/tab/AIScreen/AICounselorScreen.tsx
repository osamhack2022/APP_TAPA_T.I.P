import AIButton from '@components/AIScreen/AIButton'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import TPTextInput from '@components/TPTextInput'
import {ANSWER} from	'@constants/AI/answer'
import { QUESTION } from '@constants/AI/question'
import {COLOR} from '@constants/color'
import {FONT} from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {atom, useAtom} from 'jotai'
import React from 'react'
import { Text,View } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'

import { AINaviParamList } from './AINavigator'
type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AICounselor'
>
const QueryAtom = atom(0)
const SelectAtom = atom([-1,-1,-1,-1,-1,-1,-1])
const MonthAtom = atom("")
const AICounselorScreen: React.FC = () => {
	const [query, setQuery] = useAtom(QueryAtom)
	const [select, setSelect] = useAtom(SelectAtom)
	const [month , setMonth] = useAtom(MonthAtom)
	
	const Next = ()=>{
		if(query!==2){
			setQuery(q=>q+1)
		}
		else{
			select[2]===0 ? setQuery(q=>q+3) : setQuery(q=>q+1)
		}
	}
	const navigation = useNavigation<NavigationProp>()
	const MoveCounselorScreen = ()=>{
		navigation.pop()
		navigation.navigate('AIResult', {answer : select})
		setSelect([-1,-1,-1,-1,-1,-1])
		setQuery(0)
	}
	
	return (
		<>    
			<View style={css`
				
				justify-content : center;
				align-items : center;
			`}>
				<View style = {css`
					padding-top : 20px;
					align-items : start;
					width : 100%
				`}>
					<Text style = {css`
						padding-left : 20px;
						color : ${COLOR.GRAY.NORMAL(7)};
						font-size : 16px;
						
					`}>{query+1} / {QUESTION.length} 단계</Text>
				</View>
				
				<View style = {css`
					
					align-items : center;
					margin-top : 48px;
				`}>
					<View>
						<Text style = {css`
							font-family : ${FONT.Pretendard.BOLD};
							font-size : 28px;
							font-weight : 700;
							padding : 10px;
						`}>{QUESTION[query]}</Text>
						{query!==3 ?
						<RadioForm
						formHorizontal={false}
						animation={false}
					    >
						{
						ANSWER[query].map((obj, i) => (
							<RadioButton labelHorizontal={true} key={i} >
							<RadioButtonInput
								obj={obj}
								index={i}
								isSelected={select[query] === i}
								onPress={()=>{
									const newselect : number[]= [];
									Object.assign(newselect,select);
									newselect[query] = i;
									setSelect(newselect);
								}}
								borderWidth={1}
								buttonInnerColor={COLOR.BRAND.MAIN}
								buttonOuterColor={select[query] ===i ? COLOR.BRAND.MAIN : COLOR.GRAY.NORMAL(7)}
								buttonSize={15}
								buttonOuterSize={30}
								buttonStyle={{}}
								buttonWrapStyle={{margin: 10}}
							/>
							<RadioButtonLabel
								obj={obj}
								index={i}
								labelHorizontal={true}
          						onPress={()=>{
									const newselect : number[]= [];
									Object.assign(newselect,select);
									newselect[query] = i;
									setSelect(newselect);
								}}
        						labelStyle={{fontSize: 20, color : select[query]===i ? COLOR.BRAND.MAIN: COLOR.GRAY.NORMAL(7),
								paddingTop : 6}}
         						labelWrapStyle={{}}
        					/>
      						</RadioButton>
    						))
						}  
						</RadioForm>
						: 
						<View style = {css`
						flex-direction : row;
						align-items : center;
						`}>
							<View><Text style = {css`font-size : 16px; padding-left : 20px; padding-right : 5px;`}>약</Text></View>
								<View><TPTextInput 
									keyboardType="number-pad"
									placeholder='가혹행위가 시작된 시점을 입력해주세요'
									value = {month}
									onChangeText = {(value)=>{
										setMonth(value)
										const newselect : number[] = []
										Object.assign(newselect,select);
										newselect[3] = parseInt(month)
										setSelect(newselect)
									}}
									returnKeyType = "done"
									onSubmitEditing = {
										()=>setQuery(q=>q+1)
									}
								></TPTextInput></View>
							<View><Text style = {css`font-size : 16px;`}>달 전</Text></View>
						</View>
					}
					</View>
				</View>


			</View>
			<View style = {css`
				flex-direction : row;
				position : absolute;
				bottom : 10px;
				width: 100%
			`}>
				{(query>0)&&
				<AIButton
					onPress = {()=>setQuery(q=>q-1)}
					variant = 'secondary'
					style = {css`width : 200px;
					position : absolute;	
					left : 5px;
					bottom : 10px;
					
					`}
				>이전</AIButton>
				}
				{query<QUESTION.length-1 ? 
				<AIButton
					onPress = {Next}
					disabled = {select[query]===-1}
					style = {css`
					width : 200px;
					position : absolute;
					right : 5px;
					bottom : 10px;
					`}
				>다음</AIButton>:
				<AIButton 
					onPress = {MoveCounselorScreen}
					disabled = {select[query]===-1}
					style = {css`
					width : 200px;
					position : absolute;
					right : 5px;
					bottom : 10px;
					
					`}
				>제출</AIButton>}
				
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AICounselorScreen