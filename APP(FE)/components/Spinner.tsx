import { COLOR } from '@constants/color'
import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import tinycolor from 'tinycolor2'

type Props = {
	foregroundColor?: string
	backgroundColor?: string
}

const SpinnerSVG: React.FC<{
	foregroundColor: string
	backgroundColor: string
}> = ({ foregroundColor, backgroundColor }) => (
	<Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
		<Path
			d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM4.5 15C4.5 20.799 9.20101 25.5 15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15Z"
			fill={backgroundColor}
		/>
		<Path
			d="M27.75 15C28.9926 15 30.0173 16.0129 29.8316 17.2416C29.5035 19.4119 28.7016 21.4933 27.472 23.3336C25.8238 25.8003 23.4811 27.7229 20.7403 28.8582C17.9994 29.9935 14.9834 30.2906 12.0736 29.7118C9.16393 29.133 6.49119 27.7044 4.3934 25.6066C2.29561 23.5088 0.866999 20.8361 0.288221 17.9264C-0.290558 15.0166 0.00649254 12.0006 1.14181 9.25975C2.27712 6.51886 4.19971 4.17618 6.66645 2.52796C8.50667 1.29836 10.5881 0.496455 12.7584 0.168429C13.9871 -0.0172762 15 1.00736 15 2.25V2.25C15 3.49264 13.9814 4.4759 12.7671 4.74016C11.4881 5.01852 10.2658 5.53502 9.16651 6.26957C7.4398 7.42332 6.09399 9.0632 5.29926 10.9818C4.50454 12.9004 4.29661 15.0116 4.70175 17.0484C5.1069 19.0852 6.10693 20.9562 7.57538 22.4246C9.04383 23.8931 10.9148 24.8931 12.9516 25.2982C14.9884 25.7034 17.0996 25.4955 19.0182 24.7007C20.9368 23.906 22.5767 22.5602 23.7304 20.8335C24.465 19.7342 24.9815 18.5119 25.2598 17.2329C25.5241 16.0186 26.5074 15 27.75 15V15Z"
			fill={foregroundColor}
		/>
	</Svg>
)

const easeInOutCubic = (x: number): number => {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

const Spinner: React.FC<Props> = props => {
	const {
		foregroundColor = COLOR.BRAND.MAIN,
		backgroundColor = tinycolor(foregroundColor)
			.setAlpha(0.3)
			.toPercentageRgbString(),
	} = props

	const rotation = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.loop(
			Animated.timing(rotation, {
				toValue: 2 * Math.PI,
				useNativeDriver: true,
				duration: 1600,
				easing: easeInOutCubic,
			}),
		).start()
	}, [])

	return (
		<Animated.View
			style={{
				width: 30,
				height: 30,
				transform: [
					{
						rotate: rotation.interpolate({
							inputRange: [0, 2 * Math.PI],
							outputRange: ['0deg', '360deg'],
						}),
					},
				],
			}}
		>
			<SpinnerSVG
				foregroundColor={foregroundColor}
				backgroundColor={backgroundColor}
			/>
		</Animated.View>
	)
}

export default Spinner
