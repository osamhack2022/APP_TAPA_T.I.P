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
					🌡 타파 POINT란?
				</Text>
				<View
					style={css`
						margin-top: 8px;
						border-radius: 12px;
						background: ${COLOR.GRAY.NORMAL(1)};
						padding: 12px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
							line-height: 20px;
						`}
					>
						타파가 부조리를 더 효과적으로 이겨내기 위해선 커뮤니티의 도움이 많이
						필요해요! 커뮤니티의 활성화와 유용한 정보 및 데이터 공유가 활발하게
						이뤄질 수 있도록, 타파 커뮤니티에서 활동하는 국군 장병 사용자들에게
						타파 POINT를 제공하고 있어요.
					</Text>
				</View>
				<Spacer y={24} />
				<Text
					style={css`
						font-size: 24px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					✅ 타파 POINT 쌓는 법
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
						💬 댓글 작성시 +5pt 제공
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
						👍 내가 작성한 글이 추천 받을 시 +10pt 부여
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
						🔥 내가 작성한 글이 이슈가 때 마다 +1pt 부여
					</Text>
				</View>
				<Spacer y={24} />
				<Text
					style={css`
						font-size: 24px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					💰 타파 POINT 보상
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
						❤️ 일반 병사의 경우, 100pt 당 가점 1점을 받아요
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
						🏝 또래상담병의 경우, 2000pt 당 위로휴가 1일을 받아요
					</Text>
				</View>
				<Spacer y={24} />
				<Text
					style={css`
						font-size: 24px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					⚠️ 주의사항
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
						🙅‍♂️ 부정한 방법으로 얻은 포인트는 자동 소멸됩니다
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
						💀 비속어 등 필터링에 지속적으로 감지된 게시물이 있을 경우, 포인트
						산정에 불이익이 있을 수 있어요
					</Text>
				</View>
			</View>
		</ScrollView>
	)
}

export default AboutTapaPointScreen
