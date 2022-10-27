import { PredictionType } from '@app-types/AI'
import AIButton from '@components/AIScreen/AIButton'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import TPTextInput from '@components/TPTextInput'
import { ANSWER } from '@constants/AI/answer'
import { QUESTION } from '@constants/AI/question'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import useAIAxios from '@hooks/AIAxios'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { atom, useAtom } from 'jotai'
import React from 'react'
import { Text, View } from 'react-native'
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button'

import { AINaviParamList } from './AINavigator'
type NavigationProp = StackNavigationProp<AINaviParamList, 'AICounselor'>
const queryAtom = atom(0)
const selectAtom = atom([-1, -1, -1, -1, -1, -1, -1])
const monthAtom = atom('')
const AICounselorScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const axios = useAIAxios()
	const [query, setQuery] = useAtom(queryAtom)
	const [select, setSelect] = useAtom(selectAtom)
	const [month, setMonth] = useAtom(monthAtom)

	const setNextQuery = () => {
		if (query !== 2) {
			setQuery(q => q + 1)
		} else {
			select[2] === 0 ? setQuery(q => q + 3) : setQuery(q => q + 1)
		}
	}

	const onPressResultScreen = async () => {
		const input = {
			accident: ANSWER[0][select[0]].value,
			relation: ANSWER[1][select[1]].value,
			once: ANSWER[2][select[2]].value,
			month: select[3] !== -1 ? select[3] : 0,
			frequency:
				select[4] !== -1 ? (ANSWER[4][select[4]].value as string) : "0",
			is_planned: ANSWER[5][select[5]].value,
			mercy: ANSWER[6][select[6]].value,
		}
		const res = await axios.post<PredictionType>('/predict', input)
		console.log(res)

		if (res.status === 200) {
			setSelect([-1, -1, -1, -1, -1, -1, -1])
			setQuery(0)
			setMonth('')
			await setTimeout(()=>console.log("dangerous_rate : "+res.data.dangerous_rate),1000)

			navigation.navigate('AIResult', { result: res.data })
		}
		//input 서버에 보내서 결과값 받기 ->result객체에 저장
	}

	return (
		<>
			<View
				style={css`
					flex: 1;
					justify-content: space-between;
					padding: 20px;
				`}
			>
				<View
					style={css`
						align-items: start;
						width: 100%;
					`}
				>
					<Text
						style={css`
							color: ${COLOR.GRAY.NORMAL(7)};
							font-size: 16px;
						`}
					>
						{query + 1} / {QUESTION.length} 단계
					</Text>
					<Spacer y={20} />
					<Text
						style={css`
							font-family: ${FONT.Pretendard.BOLD};
							font-size: 24px;
						`}
					>
						{QUESTION[query]}
					</Text>
					<Spacer y={20} />
					<View>
						{query !== 3 ? (
							<RadioForm formHorizontal={false} animation={false}>
								{ANSWER[query].map((obj, i) => (
									<RadioButton labelHorizontal={true} key={i}>
										<RadioButtonInput
											obj={obj}
											index={i}
											isSelected={select[query] === i}
											onPress={() => {
												const newselect: number[] = []
												Object.assign(newselect, select)
												newselect[query] = i
												setSelect(newselect)
											}}
											borderWidth={1}
											buttonInnerColor={COLOR.BRAND.MAIN}
											buttonOuterColor={
												select[query] === i
													? COLOR.BRAND.MAIN
													: COLOR.GRAY.NORMAL(7)
											}
											buttonSize={15}
											buttonOuterSize={30}
											buttonWrapStyle={{ margin: 10 }}
										/>
										<RadioButtonLabel
											obj={obj}
											index={i}
											labelHorizontal={true}
											onPress={() => {
												const newselect: number[] = []
												Object.assign(newselect, select)
												newselect[query] = i
												setSelect(newselect)
											}}
											labelStyle={{
												fontSize: 20,
												color:
													select[query] === i
														? COLOR.BRAND.MAIN
														: COLOR.GRAY.NORMAL(7),
												paddingTop : 6,
											}}
										/>
									</RadioButton>
								))}
							</RadioForm>
						) : (
							<View
								style={css`
									flex-direction: row;
									align-items: center;
								`}
							>
								<View>
									<Text
										style={css`
											font-size: 16px;
											padding-left: 20px;
											padding-right: 5px;
										`}
									>
										약
									</Text>
								</View>

								<TPTextInput
									keyboardType="number-pad"
									placeholder="가혹행위가 시작된 시점을 입력해주세요"
									value={month}
									onChangeText={value => {
										setMonth(value)
										const newselect: number[] = []
										Object.assign(newselect, select)
										newselect[3] = parseInt(month)
										setSelect(newselect)
									}}
									returnKeyType="done"
									onSubmitEditing={() => setQuery(q => q + 1)}
								/>
								<Text
									style={css`
										font-size: 16px;
									`}
								>
									달 전
								</Text>
							</View>
						)}
					</View>
				</View>
				<View
					style={css`
						flex-direction: row;
						justify-content: space-between;
						width: 100%;
					`}
				>
					{query > 0 ? (
						<AIButton
							onPress={() => setQuery(q => q - 1)}
							variant="secondary"
							style={css`
								width: 45%;
							`}
						>
							이전
						</AIButton>
					) : (
						<Spacer x={200} />
					)}
					{query < QUESTION.length - 1 ? (
						<AIButton
							onPress={setNextQuery}
							disabled={select[query] === -1}
							style={css`
								width: 45%;
							`}
						>
							다음
						</AIButton>
					) : (
						<AIButton
							onPress={onPressResultScreen}
							disabled={select[query] === -1}
							style={css`
								width: 45%;
							`}
						>
							제출
						</AIButton>
					)}
				</View>
			</View>

			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AICounselorScreen
