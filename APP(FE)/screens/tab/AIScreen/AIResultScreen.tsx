import Dangerous from '@assets/AI/Dangerous'
import Normal from '@assets/AI/Normal'
import Safe from '@assets/AI/Safe'
import VeryDangerous from '@assets/AI/VeryDangerous'
import AIButton from '@components/AIScreen/AIButton'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { ANSWER } from '@constants/AI/answer'
import { RESULT } from '@constants/AI/result'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import useAIAxios from '@hooks/AIAxios'
import { useSafeUserQuery } from '@hooks/data/user'
import {
	RouteProp,
	useFocusEffect,
	useNavigation,
	useRoute,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useCallback } from 'react'
import { useState } from 'react'
import { Text, View } from 'react-native'

import { AINaviParamList } from './AINavigator'
type NavigationProp = StackNavigationProp<AINaviParamList, 'AIResult'>
type AIResultRouteProp = RouteProp<AINaviParamList, 'AIResult'>

type PredictionType = {
	chance_of_forced_reloc: string
	dangerous_rate: string
	predicted_punishment: string
}
const AIResultScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const axios = useAIAxios()
	const {
		params: { answer },
	} = useRoute<AIResultRouteProp>()

	const [loading, setLoading] = useState<boolean>(true)
	const [result, setResult] = useState<PredictionType | undefined>(undefined)
	const userQuery = useSafeUserQuery()
	const input = {
		accident: ANSWER[0][answer[0]].value,
		relation: ANSWER[1][answer[1]].value,
		once: ANSWER[2][answer[2]].value,
		month: answer[3] !== -1 ? answer[3] : 0,
		frequency: answer[4] !== -1 ? (ANSWER[4][answer[4]].value as string) : '0',
		is_planned: ANSWER[5][answer[5]].value,
		mercy: ANSWER[6][answer[6]].value,
	}
	//input 서버에 보내서 결과값 받기 ->result객체에 저장
	const getPredictionResult = async () => {
		const res = await axios.post<PredictionType>('/predict', input)
		setResult(res.data)
		console.log(res)
		setLoading(false)
	}

	useFocusEffect(
		useCallback(() => {
			getPredictionResult
		}, []),
	)

	const getNumbers = (result: PredictionType) => {
		const DangerScore = Math.floor(
			(parseFloat(result.dangerous_rate) * 100) / 25,
		)
		const Possibility = (
			parseFloat(result.chance_of_forced_reloc) * 100
		).toFixed(2)
		const PunishmentCanSplit = result.predicted_punishment.includes(' ~ ')
		const HavePunishmentMax = result.predicted_punishment.includes('~')
		let PunishmentMin, PunishmentMax
		if (PunishmentCanSplit) {
			const splits = result.predicted_punishment.split(' ~ ')
			PunishmentMin = splits[0]
			PunishmentMax = splits[1]
		} else if (HavePunishmentMax) {
			const position = result.predicted_punishment.indexOf('~')
			PunishmentMin =
				result.predicted_punishment.slice(0, position) +
				result.predicted_punishment.slice(position + 2)
			PunishmentMax =
				result.predicted_punishment.slice(0, position - 1) +
				result.predicted_punishment.slice(position + 1)
		} else {
			PunishmentMin = result.predicted_punishment
			PunishmentMax = '-'
		}
		return { DangerScore, Possibility, PunishmentMin, PunishmentMax }
	}

	if (loading || !result) return <FadingDots />
	else
		return (
			<>
				<View
					style={css`
						flex: 1;
						align-items: center;
					`}
				>
					<View
						style={css`
							margin-top: 20px;
							border: 1px;
							border-radius: 20px;
							border-color: ${COLOR.GRAY.NORMAL(4)};
						`}
					>
						<View
							style={css`
								padding: 20px 0px 20px 20px;
								flex-direction: row;
								align-items: flex-end;
							`}
						>
							<Text
								style={css`
									font-size: 20px;
									font-family: ${FONT.Pretendard.BOLD};
								`}
							>
								AI 상담 결과
							</Text>
							{!userQuery.isLoading && userQuery.data ? (
								<Text
									style={css`
										font-size: 16px;
										color: ${COLOR.GRAY.NORMAL(7)};
									`}
								>
									{userQuery.data.name} {userQuery.data.rank}
								</Text>
							) : (
								<FadingDots />
							)}
							<Text
								style={css`
									font-size: 16px;
									color: ${COLOR.GRAY.NORMAL(7)};
								`}
							>
								님의 상황은...
							</Text>
						</View>
						<View
							style={css`
								flex-direction: row;
								align-items: center;
							`}
						>
							<View
								style={css`
									padding: 20px;
									padding-top: 0px;
								`}
							>
								{getNumbers(result).DangerScore === 3 ? (
									<VeryDangerous />
								) : getNumbers(result).DangerScore === 2 ? (
									<Dangerous />
								) : getNumbers(result).DangerScore === 1 ? (
									<Normal />
								) : (
									<Safe />
								)}
							</View>
							<View
								style={css`
									width: 250px;
									margin-right: 20px;
								`}
							>
								<Text
									style={css`
										font-size: 24px;
										padding-bottom: 10px;
										color: ${RESULT[getNumbers(result).DangerScore].color};
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									{RESULT[getNumbers(result).DangerScore].context}
								</Text>
								<Text
									style={css`
										font-size: 16px;
										padding-bottom: 12px;
									`}
								>
									{RESULT[getNumbers(result).DangerScore].description}
								</Text>
							</View>
						</View>
					</View>
					<View
						style={css`
							border: 1px;
							border-radius: 20px;
							border-color: ${COLOR.GRAY.NORMAL(4)};
							width: 390px;
							justify-content: center;
							align-items: center;
							margin-top: 28px;
						`}
					>
						<View style={css``}>
							<View
								style={css`
									margin: 20px;
								`}
							>
								<Text
									style={css`
										font-size: 20px;
										text-align: center;
									`}
								>
									가해자 신고시 예상 처벌 수위
								</Text>
							</View>
							<View
								style={css`
									flex-direction: row;
								`}
							>
								<View
									style={css`
										justify-content: center;
										width: 50%;
									`}
								>
									<Text
										style={css`
											text-align: center;
											color: ${COLOR.GRAY.NORMAL(7)};
											font-size: 20px;
										`}
									>
										최소
									</Text>
									<Text
										style={css`
											text-align: center;
											font-size: 24px;
											font-family: ${FONT.Pretendard.BOLD};
											padding: 16px;
										`}
									>
										{getNumbers(result).PunishmentMin}
									</Text>
								</View>
								<View
									style={css`
										justify-content: center;
										width: 50%;
									`}
								>
									<Text
										style={css`
											text-align: center;
											color: ${COLOR.GRAY.NORMAL(7)};
											font-size: 20px;
										`}
									>
										최대
									</Text>
									<Text
										style={css`
											text-align: center;
											font-size: 24px;
											font-family: ${FONT.Pretendard.BOLD};
											padding: 16px;
										`}
									>
										{getNumbers(result).PunishmentMax}
									</Text>
								</View>
							</View>
						</View>
						<View>
							<View
								style={css`
									flex-direction: row;
									width: 90%;
									padding-bottom: 20px;
									padding-top: 20px;
									align-items: center;
								`}
							>
								<View>
									<Text
										style={css`
											font-size: 20px;
										`}
									>
										분리조치 가능성
									</Text>
								</View>
								<View
									style={css`
										padding-left: 20px;
									`}
								>
									<Text
										style={css`
											font-size: 24px;
											font-family: ${FONT.Pretendard.BOLD};
											color: ${RESULT[getNumbers(result).DangerScore].color};
										`}
									>
										{getNumbers(result).Possibility}%
									</Text>
								</View>
							</View>
						</View>
					</View>
					<AIButton
						style={css`
							position: absolute;
							width: 300px;
							bottom: 20px;
						`}
						variant="secondary"
						onPress={() => navigation.navigate('AIHome')}
					>
						다시하기
					</AIButton>
				</View>
				<FocusAwareStatusBar style="dark" />
			</>
		)
}

export default AIResultScreen
