import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useRef } from 'react'
import { Animated, Easing, StyleProp, View, ViewStyle } from 'react-native'

type Props = {
	value: number
	style?: StyleProp<ViewStyle>
	color?: string
	backgroundColor?: string
}

const AnimatedProgressBar: React.FC<Props> = ({
	value,
	style,
	color,
	backgroundColor,
}) => {
	const progressValue = useRef(new Animated.Value(0)).current

	useFocusEffect(
		useCallback(() => {
			Animated.timing(progressValue, {
				toValue: value,
				useNativeDriver: false,
				duration: 900,
				easing: Easing.inOut(Easing.ease),
			}).start()
			return () => progressValue.setValue(0)
		}, [value]),
	)

	return (
		<View
			style={[
				css`
					height: 12px;
					background: ${backgroundColor ?? COLOR.GRAY.NORMAL(3)};
					border-radius: 4px;
					overflow: hidden;
				`,
				style,
			]}
		>
			<Animated.View
				style={[
					css`
						height: 100%;
						border-radius: 4px;
						background: ${color ?? COLOR.BRAND.MAIN};
					`,
					{
						width: progressValue.interpolate({
							inputRange: [0, 1],
							outputRange: ['0%', '100%'],
						}),
					},
				]}
			/>
		</View>
	)
}

export default AnimatedProgressBar
