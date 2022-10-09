import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Text, View } from 'react-native'

const Page4: React.FC = () => (
	<View>
		<Text
			style={css`
				text-align: center;
				color: #fff;
				font-size: 32px;
				font-family: ${FONT.Pretendard.BOLD};
			`}
		>
			회원가입하고 시작하기
		</Text>
	</View>
)

export default Page4
