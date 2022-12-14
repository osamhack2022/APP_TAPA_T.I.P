import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { RootStackScreenProps } from '@navigators/RootStack'
import { ScrollView, Text, View } from 'react-native'

import { FONT } from '@/constants/font'

type Props = RootStackScreenProps<'AboutTapaPoint'>

const AboutTapaPointScreen: React.FC<Props> = props => {
	const { navigation, route } = props

	return (
		<ScrollView
			contentInset={{
				bottom: 24,
			}}
		>
			<View
				style={css`
					padding: 24px 20px;
				`}
			>
				<Text
					style={css`
						font-size: 32px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					๐ก ํํ POINT๋?
				</Text>
				<View
					style={css`
						margin-top: 8px;
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							color: ${COLOR.BLACK(2)};
						`}
					>
						ํํ๊ฐ ๋ถ์กฐ๋ฆฌ๋ฅผ ๋ ํจ๊ณผ์ ์ผ๋ก ์ด๊ฒจ๋ด๊ธฐ ์ํด์  ์ปค๋ฎค๋ํฐ์ ๋์์ด ๋ง์ด
						ํ์ํด์!{'\n\n'}์ปค๋ฎค๋ํฐ์ ํ์ฑํ์ ์ ์ฉํ ์ ๋ณด ๋ฐ ๋ฐ์ดํฐ ๊ณต์ ๊ฐ
						ํ๋ฐํ๊ฒ ์ด๋ค์ง ์ ์๋๋ก, ํํ ์ปค๋ฎค๋ํฐ์์ ํ๋ํ๋ ๊ตญ๊ตฐ ์ฅ๋ณ
						์ฌ์ฉ์๋ค์๊ฒ ํํ POINT๋ฅผ ์ ๊ณตํ๊ณ  ์์ด์.
					</Text>
				</View>
				<Spacer y={24} />
				<Text
					style={css`
						font-size: 24px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					โ ํํ POINT ์๋ ๋ฒ
				</Text>
				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.BRAND.TINT(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							color: ${COLOR.BRAND.MAIN};
						`}
					>
						๐ฌ ๋๊ธ ์์ฑ์ +5pt ์ ๊ณต
					</Text>
				</View>
				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.BRAND.TINT(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							color: ${COLOR.BRAND.MAIN};
						`}
					>
						๐ ๋ด๊ฐ ์์ฑํ ๊ธ์ด ์ถ์ฒ ๋ฐ์ ์ +10pt ๋ถ์ฌ
					</Text>
				</View>

				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.BRAND.TINT(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							color: ${COLOR.BRAND.MAIN};
						`}
					>
						๐ฅ ๋ด๊ฐ ์์ฑํ ๊ธ์ด ์ด์๊ฐ ๋ ๋ง๋ค +1pt ๋ถ์ฌ
					</Text>
				</View>
				<Spacer y={24} />
				<Text
					style={css`
						font-size: 24px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					๐ฐ ํํ POINT ๋ณด์
				</Text>
				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.BRAND.TINT(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							color: ${COLOR.BRAND.MAIN};
						`}
					>
						โค๏ธ ์ผ๋ฐ ๋ณ์ฌ์ ๊ฒฝ์ฐ, 100pt ๋น ๊ฐ์  1์ ์ ๋ฐ์์
					</Text>
				</View>
				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.BRAND.TINT(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							color: ${COLOR.BRAND.MAIN};
						`}
					>
						๐ ๋๋์๋ด๋ณ์ ๊ฒฝ์ฐ, 2000pt ๋น ์๋กํด๊ฐ 1์ผ์ ๋ฐ์์
					</Text>
				</View>
				<Spacer y={24} />
				<Text
					style={css`
						font-size: 24px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					โ ๏ธ ์ฃผ์์ฌํญ
				</Text>
				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.BRAND.TINT(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							color: ${COLOR.BRAND.MAIN};
						`}
					>
						๐โโ๏ธ ๋ถ์ ํ ๋ฐฉ๋ฒ์ผ๋ก ์ป์ ํฌ์ธํธ๋ ์๋ ์๋ฉธ๋ฉ๋๋ค
					</Text>
				</View>
				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.BRAND.TINT(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
							font-family: ${FONT.Pretendard.BOLD};
							color: ${COLOR.BRAND.MAIN};
						`}
					>
						๐ ๋น์์ด ๋ฑ ํํฐ๋ง์ ์ง์์ ์ผ๋ก ๊ฐ์ง๋ ๊ฒ์๋ฌผ์ด ์์ ๊ฒฝ์ฐ, ํฌ์ธํธ
						์ฐ์ ์ ๋ถ์ด์ต์ด ์์ ์ ์์ด์
					</Text>
				</View>
			</View>
		</ScrollView>
	)
}

export default AboutTapaPointScreen
