import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Text, View } from 'react-native'

const ChartBar: React.FC<{
	data: string
	label: string
	index: number
	color: string
}> = ({ color, index, label, data }) => (
	<View
		style={[
			css`
				background: ${color ?? COLOR.BRAND.MAIN};
				border-top-left-radius: 12px;
				border-top-right-radius: 12px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
				width: 100px;
				padding: 8px;

				justify-content: space-between;
			`,
			{
				height: (3 - index) * 40 + 96,
			},
		]}
	>
		<View>
			<Text
				style={css`
					font-family: ${FONT.Pretendard.BOLD};
					font-size: 28px;
					color: #fff;
				`}
			>
				#{index + 1}
			</Text>
			<Text
				style={css`
					font-family: ${FONT.Pretendard.BOLD};
					font-size: 20px;
					color: #fff;
				`}
			>
				{data}
			</Text>
		</View>
		<View
			style={css`
				width: 120px;
				padding-bottom: 12px;
				transform: translate(30px, 12px) rotate(-90deg);
			`}
		>
			<Text
				style={css`
					font-family: ${FONT.Pretendard.BOLD};
					font-size: 18px;
					color: #ffffffaa;
				`}
			>
				{label.split(' ')[0]}
			</Text>
			<Text
				style={css`
					font-family: ${FONT.Pretendard.BOLD};
					font-size: 18px;
					color: #ffffff;
				`}
			>
				{label.split(' ')[1]}
			</Text>
		</View>
	</View>
)

export default ChartBar
