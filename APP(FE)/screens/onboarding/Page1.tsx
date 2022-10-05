import { css } from '@emotion/native'
import { Text, View } from 'react-native'

import { FONT } from '@/constants/font'

const Page1: React.FC = () => (
	<View>
		<Text
			style={css`
				text-align: center;
				color: #fff;
				font-size: 32px;
				font-family: ${FONT.Pretendard.BOLD};
			`}
		>
			전문가의 도움 받기
		</Text>
	</View>
)

export default Page1
