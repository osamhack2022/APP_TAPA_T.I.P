import { css } from '@emotion/native'
import { Text, View } from 'react-native'

import { FONT } from '@constants/font'

const Page2: React.FC = () => (
	<View>
		<Text
			style={css`
				text-align: center;
				color: #fff;
				font-size: 32px;
				font-family: ${FONT.Pretendard.BOLD};
			`}
		>
			또래 장병에게 상담받기
		</Text>
	</View>
)

export default Page2
