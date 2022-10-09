import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { Text, View } from 'react-native'

const CommunityPostScreen: React.FC = () => (
	<>
		<View
			style={css`
				flex: 1;
				align-items: center;
				justify-content: center;
			`}
		>
			<Text>This is the post you're looking for</Text>
		</View>
		<FocusAwareStatusBar style="dark" />
	</>
)

export default CommunityPostScreen
