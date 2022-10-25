import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
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
	const axios = useAxios()
   
	return (
		<>
			<View
				style={css`
					flex: 1;
					align-items: center;
				`}
			>
				<View>
					<View>
						<Text>AI 상담 결과</Text>
						<Text>{}님의 상황은...</Text>
					</View>
				</View>
				
				
					
				
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default AIResultScreen