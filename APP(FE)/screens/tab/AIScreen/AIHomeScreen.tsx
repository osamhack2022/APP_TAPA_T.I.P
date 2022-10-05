import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Text, View } from 'react-native'

import { AINaviParamList } from './AINavigator'

type NavigationProp = StackNavigationProp<
	AINaviParamList,
	'AIHome'
>

const AIHomeScreen: React.FC = () => {
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
				<Text>AIHomeScreen</Text>
				<Button
					title="counselor"
					onPress={() => navigation.navigate('AICounselor')}
				/>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}
export default AIHomeScreen