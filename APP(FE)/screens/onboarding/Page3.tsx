import { css } from '@emotion/native'
import { Text, View } from 'react-native'

const Page3: React.FC = () => (
	<View>
		<Text
			style={css`
				text-align: center;
				color: #fff;
				font-size: 32px;
				font-weight: 700;
			`}
		>
			AI에게 도움받기
		</Text>
	</View>
)

export default Page3
