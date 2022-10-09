import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { ReactNode } from 'react'
import { Pressable, PressableProps, Text } from 'react-native'

type Props = Omit<PressableProps, 'disabled' | 'children'> & {
	disabled?: boolean
	loading?: boolean
	children?: string | ReactNode
}

const BorderButton: React.FC<Props> = ({
	children,
	disabled,
	loading,
	style,
	...passProps
}) => {
	return (
		<Pressable
			{...passProps}
			disabled={disabled}
			style={({ pressed }) => [
				css`
					padding: 10px 30px;
					border-radius: 16px;
					border-color: ${COLOR.GRAY.NORMAL(6)};
					border-width: 1px;
					justify-content: center;
					align-items: center;
				`,
				typeof style === 'function' ? style({ pressed }) : style,
			]}
		>
			<Text
				style={css`
					color: ${COLOR.GRAY.NORMAL(6)};
					font-size: 14px;
					font-family: ${FONT.Pretendard.REGULAR};
				`}
			>
				{children}
			</Text>
		</Pressable>
	)
}

export default BorderButton
