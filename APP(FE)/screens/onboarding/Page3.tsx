import { css } from '@emotion/native'
import { Text, View } from 'react-native'

import { FONT } from '@constants/font'

const Page3: React.FC = () => (
	<View>
		<Text
			style={css`
				text-align: center;
				color: #fff;
				font-size: 32px;
				font-family: ${FONT.Pretendard.BOLD};
			`}
		>
			AI에게 도움받기
		</Text>
	</View>
)

export default Page3
