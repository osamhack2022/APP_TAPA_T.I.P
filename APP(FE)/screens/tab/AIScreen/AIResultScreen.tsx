import Icon1 from '@assets/AI/Icon1'
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
	const input = [ANSWER[0][answer[0]].value,ANSWER[1][answer[1]].value, ANSWER[2][answer[2]].value,0,"0", ANSWER[5][answer[5]].value, ANSWER[6][answer[6]].value]
	if(answer[3]!==-1) input[3] = answer[3]
	if(answer[4]!==-1) input[4] = ANSWER[4][answer[4]].value
	//input 서버에 보내서 결과값 받기 ->result객체에 저장

	const axios = useAxios()
	const result = {grade : 0, danger : 80.23 , punishment_min : "군기교육 중", punishment_max : "강등", possibility : 82.17}
	const userQuery = useSafeUserQuery()

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
							<Icon1></Icon1>
						</View>
						<View style = {css`
							width : 250px;
							margin-right : 20px;
						`}>
							<Text style = {css`
								
								font-size : 24px;
								padding-bottom : 10px;
								color : red;
								font-family : ${FONT.Pretendard.BOLD};

							`}>{RESULT[result.grade].context}</Text>
							<Text
								style = {css`
									font-size : 16px;
									padding-bottom : 12px;
								`}
							>{RESULT[result.grade].description}</Text>
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
								`}>{result.punishment_min}</Text>
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
								`}>{result.punishment_max}</Text>
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
								color : red;

							`}>{result.possibility}%</Text>
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