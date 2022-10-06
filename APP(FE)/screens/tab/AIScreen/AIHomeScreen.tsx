import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Pressable, Text, View } from 'react-native'

import { AINaviParamList } from './AINavigator'

type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AIHome'
>

const AIHomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<>
			<View style = {css`flex : 1;`}>
				<View
					style={css`
						flex: 1;
						align-items: center;
						justify-content: center;
					`}
				>
					<Text style = {css`
					
						font-style: normal;
						font-weight: 700;
						font-size: 25px;
						color: #7C7C7C;
					`}>처벌 수위 예측 서비스</Text>
				</View>
				<View style = {css`
					
					backgroundColor : yellow;
					height: 63px;
					align-items: center;
					margin : 30px 0px 0px 0px;
					padding : 0px 100px;
				`}>
					<Text style = {css`
						
						font-style: normal;
						font-weight: 500;
						font-size: 14px;
						line-height : 25%;
					`}>사건의 정보를 간단히 입력하면 대략적인 처벌 수위를 예측해주는 서비스를 제공하고 있습니다</Text>

				</View>
				<View>
					<Button title="시작하기" 
					onPress={()=>navigation.navigate('AICounselor') }></Button>

				</View>
			</View>
			



			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AIHomeScreen