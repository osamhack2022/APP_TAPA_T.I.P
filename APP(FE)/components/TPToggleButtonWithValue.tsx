import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { Pressable, PressableProps, Text, View } from 'react-native'
type Props = Omit<PressableProps, 'disabled' | 'children'> & {
	title: string
	iconName: string
	count: number
	toggle: boolean
}

const TPToggleButtonWithValue: React.FC<Props> = ({
	title,
	iconName,
	count,
	toggle,
	style,
	...passProps
}) => {
	const buttonColor = (toggle: boolean, pressed: boolean) => {
		return toggle
			? pressed
				? COLOR.BRAND.SHADE(1)
				: COLOR.BRAND.MAIN
			: pressed
			? COLOR.BRAND.TINT(3)
			: COLOR.GRAY.NORMAL(1)
	}

	return (
		<Pressable
			{...passProps}
			style={({ pressed }) => [
				css`
					width: 84px;
					align-self: center;
					align-items: center;
					align-items: center;
					flex-direction: row;
					border-color: ${buttonColor(toggle, pressed)};
					background-color: ${buttonColor(toggle, pressed)};
					border-width: 1px;
				`,
				typeof style === 'function' ? style({ pressed }) : style,
			]}
		>
			<View
				style={css`
					width: 24px;
					height: 24px;
					align-items: center;
					justify-content: center;
				`}
			>
				<FontAwesome5 solid name={iconName} />
			</View>
			<Text
				style={css`
					width: 28px;
					font-size: 12px;
					justify-content: center;
					text-align: center;
				`}
			>
				{title}
			</Text>
			<Text
				style={css`
					width: 32px;
					text-align: center;
					justify-content: center;
				`}
			>
				{count}
			</Text>
		</Pressable>
	)
}

export default TPToggleButtonWithValue
