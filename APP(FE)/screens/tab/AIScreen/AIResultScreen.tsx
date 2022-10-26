import Dangerous from '@assets/AI/Dangerous'
import Normal from '@assets/AI/Normal'
import Safe from '@assets/AI/Safe'
import VeryDangerous from '@assets/AI/VeryDangerous'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import {ANSWER} from '@constants/AI/answer'
import {RESULT} from '@constants/AI/result'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { useSafeUserQuery } from '@hooks/data/user'
import { RouteProp,useNavigation,useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, View } from 'react-native'

import { AINaviParamList } from './AINavigator'
type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AIResult'	
>
type AIResultRouteProp = RouteProp<
	AINaviParamList,
	'AIResult'
>
const AIResultScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const {params : {answer},} =useRoute<AIResultRouteProp>()
	const input = { "accident": ANSWER[0][answer[0]].value,
					"realtion" : ANSWER[1][answer[1]].value, 
					"once" : ANSWER[2][answer[2]].value,
					"month" : 0,
					"frequency":"0", 
					"is_planned" : ANSWER[5][answer[5]].value, 
					"mercy" : ANSWER[6][answer[6]].value}
	if(answer[3]!==-1) input.month = answer[3]
	if(answer[4]!==-1) input.frequency = ANSWER[4][answer[4]].value as string
	//input 서버에 보내서 결과값 받기 ->result객체에 저장
	
	const axios = useAxios()
	axios.post('/predict',input).then(response =>{
		console.log(response)
		console.log(response.data)
	}).catch(error=>{
		console.log(error)
	})
	const result = {"chance_of_forced_reloc" : "0.817194", "dangerous_rate" : "0.8698278", "predicted_punishment": "휴가단축 5일 ~ 감봉 1개월"}


	const userQuery = useSafeUserQuery()

	const DangerScore = Math.floor(((parseFloat(result.dangerous_rate)*100)/25))
	const Possibility = (parseFloat(result.chance_of_forced_reloc)*100).toFixed(1)
	const PunishmentCanSplit = (result.predicted_punishment).includes(" ~ ")
	const HavePunishmentMax = (result.predicted_punishment).includes("~")
	let PunishmentMin, PunishmentMax
	if(PunishmentCanSplit){
		const splits = (result.predicted_punishment).split(" ~ ")
		PunishmentMin = splits[0]
		PunishmentMax = splits[1]
	}else if(HavePunishmentMax){
		const position = (result.predicted_punishment).indexOf('~')
		PunishmentMin = (result.predicted_punishment).slice(0,position) + (result.predicted_punishment).slice(position+2)
		PunishmentMax =(result.predicted_punishment).slice(0,position-1) + (result.predicted_punishment).slice(position+1)
	}else{
		PunishmentMin = result.predicted_punishment
		PunishmentMax = "-"
	}


	return (
		<>
			<View
				style={css`
					flex: 1;
					align-items: center;

				`}
			>
				<View style = {css`
					margin-top : 20px;
					border : 1px;
					border-radius : 20px;
					border-color : ${COLOR.GRAY.NORMAL(4)};
					
				`}>
					<View style = {css`
						padding : 20px 0px 20px 20px;
						flex-direction : row;
						align-items : flex-end;
						
					`}
					>
						<Text
							style={css`
							font-size: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							`}
						>AI 상담 결과  </Text>
						{!userQuery.isLoading && userQuery.data ? (
								<Text
									style={css`
										font-size: 16px;
										color : ${COLOR.GRAY.NORMAL(7)}
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
							color : ${COLOR.GRAY.NORMAL(7)}
							`}
						>님의 상황은...</Text>
					</View>
					<View style = {css`
						flex-direction : row;
						align-items : center;

					`}>
						<View style = {css`
							padding : 20px;
							padding-top : 0px;
							
						`}>
							{DangerScore ===3 ? <VeryDangerous/> :
							 DangerScore ===2 ? <Dangerous/> :
							 DangerScore ===1 ? <Normal/> :
							 <Safe/>}
						</View>
						<View style = {css`
							width : 250px;
							margin-right : 20px;
						`}>
							<Text style = {css`
								
								font-size : 24px;
								padding-bottom : 10px;
								color : ${RESULT[DangerScore].color};
								font-family : ${FONT.Pretendard.BOLD};

							`}>{RESULT[DangerScore].context}</Text>
							<Text
								style = {css`
									font-size : 16px;
									padding-bottom : 12px;
								`}
							>{RESULT[DangerScore].description}</Text>
						</View>

					</View>
				</View>
				<View
					style = {css`
						border : 1px;
						border-radius : 20px;
						border-color : ${COLOR.GRAY.NORMAL(4)};
						width : 390px;
						justify-content : center;
						align-items : center;
						margin-top : 28px;
					`}
				>
					<View style = {css`
					`}>
						<View style = {css`
							margin : 20px;
						`}>
							<Text style = {css`
								font-size : 20px;
								text-align : center;
							`}>가해자 신고시 예상 처벌 수위</Text>
						</View>
						<View
							style = {css`
								flex-direction : row;
							`}
						>
							<View style = {css`
								justify-content : center;
								width : 50%;
							`}>
								<Text style ={css`
									text-align : center;
									color : ${COLOR.GRAY.NORMAL(7)};
									font-size: 20px;
								`}>최소</Text>
								<Text style = {css`
									text-align : center;
									font-size : 24px;
									font-family : ${FONT.Pretendard.BOLD};
									padding : 16px;
								`}>{PunishmentMin}</Text>
							</View>
							<View style = {css`
								justify-content : center;
								width : 50%;
							`}>
								<Text style ={css`
									text-align : center;
									color : ${COLOR.GRAY.NORMAL(7)};
									font-size : 20px;
								`}>최대</Text>
								<Text style = {css`
									text-align : center;
									font-size : 24px;
									font-family : ${FONT.Pretendard.BOLD};
									padding : 16px;
								`}>{PunishmentMax}</Text>
							</View>
						</View>
					</View>
					<View>
					<View style = {css`
						flex-direction : row;
						width : 90%;
						
						padding-bottom : 20px;
						padding-top : 20px;
						align-items : center;
					`}>
						
						<View>
							<Text style = {css`
								font-size : 20px;
							`}>분리조치 가능성</Text>
						</View>
						<View style = {css`
							padding-left : 20px;
						`}>
							<Text style = {css`
								font-size: 24px;
								font-family : ${FONT.Pretendard.BOLD};
								color : ${RESULT[DangerScore].color};
							`}>{Possibility}%</Text>
						</View>
					</View>
					</View>

				</View>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default AIResultScreen