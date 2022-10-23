import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import {FONT} from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, View } from 'react-native'

import TPButton from '@/components/TPButton'

import { AINaviParamList } from './AINavigator'

type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AIHome'
>

const AIHomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<>
			<View >
				<View
					style={css`
						margin-top : 100px;
						align-items: center;
						justify-content: center;
						
					`}
				>
					<Text style = {css`
						font-family : ${FONT.Pretendard.BOLD};
						font-style: normal;
						font-weight: 700;
						font-size: 25px;
					`}>처벌 수위 예측 서비스</Text>
				</View>
				<View style = {css`
					margin-top: 40px;
					align-items: center;
					justify-content : center;
					
				`}>
					<Text style = {css`
						font-family : ${FONT.Pretendard.REGULAR};
						text-align: center;
						font-style: normal;
						font-weight: 500;
						font-size: 14px;
						line-height : 25%;
						width : 45%
					`}>사건의 정보를 간단히 입력하면{"\n"}대략적인 처벌 수위를 예측해주는{"\n"}서비스를 제공하고 있습니다</Text>

				</View>
				<View style = {css`
					align-items : center;
					margin-top : 300px;
				`}>
					<View style = {css`
						
						width : 275px;
						padding : 10px;
					`}>
						<TPButton size = "large"
							onPress = {()=>navigation.navigate('AICounselor')}
						>
							AI 상담받기
						</TPButton>

					</View>
					
					
				</View>
			</View>
			



			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AIHomeScreen