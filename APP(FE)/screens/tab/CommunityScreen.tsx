import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { Text, View } from 'react-native'

const CommunityScreen: React.FC = () => (
	<>
		<View
			style={css`
				flex: 1;
				align-items: center;
				justify-content: center;
			`}
		>
			<Text>CommunityScreen</Text>
		</View>
		<FocusAwareStatusBar style="dark" />
	</>
)

export default CommunityScreen
