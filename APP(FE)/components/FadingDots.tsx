import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

const DOT_STYLE = css`
	width: 16px;
	height: 16px;
	background: ${COLOR.BLACK(1)};
	border-radius: 8px;
`

const FadingDots: React.FC = () => {
	const animations = new Array(3).fill(0).map(k => {
		return useRef(new Animated.Value(0.3)).current
	})

	useEffect(() => {
		animations.forEach(async (animation, idx) => {
			await new Promise(resolve => setTimeout(() => resolve(0), idx * 100))
			Animated.loop(
				Animated.sequence([
					Animated.timing(animation, {
						toValue: 1,
						useNativeDriver: true,
						duration: 500,
					}),
					Animated.timing(animation, {
						toValue: 0.3,
						useNativeDriver: true,
						duration: 500,
					}),
				]),
			).start()
		})
	}, [])

	return (
		<View
			style={css`
				flex-direction: row;
			`}
		>
			{animations.map((animation, idx) => (
				<Animated.View
					key={idx}
					style={[
						DOT_STYLE,
						{
							marginRight: 8,
							opacity: animation,
						},
					]}
				/>
			))}
		</View>
	)
}

export default FadingDots
