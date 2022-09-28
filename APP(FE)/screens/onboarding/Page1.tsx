import { css } from '@emotion/native'
import { Text, View } from 'react-native'

const Page1: React.FC = () => (
	<View>
		<Text
			style={css`
				text-align: center;
				color: #fff;
				font-size: 32px;
				font-weight: 700;
			`}
		>
			전문가의 도움 받기
		</Text>
	</View>
)

export default Page1
