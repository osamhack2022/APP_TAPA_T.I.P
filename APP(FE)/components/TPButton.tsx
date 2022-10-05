import { css } from '@emotion/native'
import { Pressable, PressableProps, Text } from 'react-native'
import tinycolor from 'tinycolor2'

import { FONT } from '@/constants/font'

type Props = Omit<PressableProps, 'disabled' | 'children'> & {
	variant?: 'primary' | 'secondary'
	disabled?: boolean
	loading?: boolean
	children?: string
	size?: 'small' | 'medium' | 'large'
}

const TPButton: React.FC<Props> = ({
	children,
	disabled,
	loading,
	variant = 'primary',
	size = 'medium',
	style,
	...passProps
}) => {
	const color = variant === 'primary' ? '#0059ff' : '#343434'
	const pressedColor = tinycolor(color).darken(10).toHexString()
	const [padding, fontSize] =
		size === 'small'
			? [8, 14]
			: size === 'medium'
			? [12, 16]
			: size === 'large'
			? [16, 18]
			: [16, 18]
	return (
		<Pressable
			{...passProps}
			style={({ pressed }) => [
				css`
					border-radius: 12px;
					padding: ${padding + 'px'};
					align-items: center;
					background: ${pressed ? pressedColor : color};
				`,
				typeof style === 'function' ? style({ pressed }) : style,
			]}
		>
			<Text
				style={css`
					color: #fff;
					font-size: ${fontSize + 'px'};
					font-family: ${FONT.Pretendard.BOLD};
				`}
			>
				{children}
			</Text>
		</Pressable>
	)
}

export default TPButton
