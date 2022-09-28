import { css } from '@emotion/native'
import { Text, View } from 'react-native'

const Page2: React.FC = () => (
	<View>
		<Text
			style={css`
				text-align: center;
				color: #fff;
				font-size: 32px;
				font-weight: 700;
			`}
		>
			또래 장병에게 상담받기
		</Text>
	</View>
)

export default Page2
