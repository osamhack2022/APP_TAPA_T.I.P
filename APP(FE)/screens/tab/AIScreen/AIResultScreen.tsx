import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
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
	return (
		<>
			<View
				style={css`
					flex: 1;
					align-items: center;
					justify-content: center;
				`}
			>
				<Text>AIResultScreen</Text>
				
					
				
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default AIResultScreen