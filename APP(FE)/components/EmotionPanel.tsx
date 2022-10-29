import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Text, View } from 'react-native'

import AnimatedProgressBar from './AnimatedProgressBar'

export type EmotionData = {
	happiness: number
	sadness: number
	anger: number
	surprise: number
	anxious: number
	hurt: number
}

type Props = {
	emotionData: EmotionData
}

export type EmotionKey = keyof EmotionData

export const EMOTION_LABEL: Record<keyof EmotionData, string> = {
	happiness: '행복',
	sadness: '슬픔',
	anger: '분노',
	surprise: '당항',
	anxious: '불안',
	hurt: '상처',
}

export const EMOTION_COLORS: Record<keyof EmotionData, string> = {
	happiness: '#f15bb5',
	sadness: '#0096c7',
	anger: '#ef233c',
	surprise: '#ffd60a',
	anxious: '#8ac926',
	hurt: '#ef476f',
}

const EmotionPanel: React.FC<Props> = ({ emotionData }) => {
	return (
		<View>
			{Object.keys(emotionData).map(emotion => (
				<View
					key={emotion}
					style={css`
						flex-direction: row;
						margin-bottom: 12px;
						align-items: center;
					`}
				>
					<View
						style={css`
							width: 40px;
						`}
					>
						<Text
							style={css`
								font-size: 16px;
								font-family: ${FONT.Pretendard.BOLD};
							`}
						>
							{EMOTION_LABEL[emotion as keyof EmotionData]}
						</Text>
					</View>
					<AnimatedProgressBar
						style={css`
							flex: 1;
						`}
						color={EMOTION_COLORS[emotion as keyof EmotionData]}
						value={emotionData[emotion as keyof EmotionData]}
					/>
					<View
						style={css`
							width: 40px;
							align-items: flex-end;
						`}
					>
						<Text
							style={css`
								font-size: 14px;
							`}
						>
							{(emotionData[emotion as keyof EmotionData] * 100).toFixed(0)}%
						</Text>
					</View>
				</View>
			))}
		</View>
	)
}

export default EmotionPanel
