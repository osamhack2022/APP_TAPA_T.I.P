import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Text, View } from 'react-native'

import { CommunityNaviParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNaviParamList,
	'CommunityHome'
>

const CommunityHomeScreen: React.FC = () => {
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
				<Text>CommunityScreen</Text>
				<Button
					title="post"
					onPress={() => navigation.navigate('CommunityPost', { postId: 1 })}
				>
					post
				</Button>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default CommunityHomeScreen
