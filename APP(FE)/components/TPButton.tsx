import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { ReactNode } from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import tinycolor from 'tinycolor2'

type Props = Omit<PressableProps, 'disabled' | 'children'> & {
	variant?: 'primary' | 'secondary' | 'border'
	disabled?: boolean
	loading?: boolean
	children?: string | ReactNode
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
	const color =
		variant === 'border'
			? '#fff'
			: variant === 'primary'
			? COLOR.BRAND.MAIN
			: COLOR.BLACK(4)
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
			disabled={disabled}
			style={({ pressed }) => [
				css`
					border-radius: 12px;
					padding: ${padding + 'px'};
					align-items: center;
					border-color: ${COLOR.GRAY.NORMAL(6)};
					border-width: ${variant === 'border' ? '1px' : '0px'};
					background: ${pressed ? pressedColor : color};
				`,
				typeof style === 'function' ? style({ pressed }) : style,
			]}
		>
			<Text
				style={css`
					color: ${variant === 'border' ? COLOR.GRAY.NORMAL(6) : '#fff'};
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
