import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { ReactNode } from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import tinycolor from 'tinycolor2'

import Spinner from './Spinner'

type Props = Omit<PressableProps, 'disabled' | 'children'> & {
	variant?: 'primary' | 'secondary' | 'inline'
	disabled?: boolean
	loading?: boolean
	children?: ReactNode
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
	const color = disabled
		? COLOR.GRAY.NORMAL(5)
		: variant === 'primary'
		? COLOR.BRAND.MAIN
		: COLOR.BLACK(4)
	const pressedColor = tinycolor(color).darken(10).toHexString()
	const [padding, fontSize] =
		size === 'small'
			? [12, 14]
			: size === 'medium'
			? [16, 16]
			: size === 'large'
			? [20, 18]
			: [20, 18]

	return (
		<Pressable
			{...passProps}
			disabled={disabled || loading}
			style={({ pressed }) => [
				variant === 'inline'
					? css``
					: css`
							border-radius: ${padding / 2 + 'px'};
							padding-horizontal: ${padding + 'px'};
							padding-vertical: ${padding - 4 + 'px'};
							align-items: center;
							background: ${pressed ? pressedColor : color};
					  `,
				typeof style === 'function' ? style({ pressed }) : style,
			]}
		>
			{loading ? (
				<Spinner
					backgroundColor="#ffffff33"
					foregroundColor="#fff"
					size={fontSize}
				/>
			) : typeof children === 'string' ? (
				<Text
					style={[
						variant === 'inline'
							? css`
									color: ${disabled ? COLOR.GRAY.NORMAL(6) : COLOR.BRAND.MAIN};
									font-size: ${fontSize + 4 + 'px'};
							  `
							: css`
									color: #fff;
							  `,
						css`
							font-size: ${fontSize + 'px'};
							font-family: ${FONT.Pretendard.BOLD};
						`,
					]}
				>
					{children}
				</Text>
			) : (
				<>{children}</>
			)}
		</Pressable>
	)
}

export default TPButton