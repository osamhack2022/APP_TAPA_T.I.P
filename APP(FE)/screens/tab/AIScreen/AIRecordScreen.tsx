import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, View } from 'react-native'

import { AINaviParamList } from './AINavigator'

type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AIRecord'
>
const AIRecordScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<>
			<View
				style={css`
					flex: 1;
					align-items: center;
					justify-content: center;
				`}
			>
				<Text>AIRecordScreen</Text>
				
					
				
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default AIRecordScreen