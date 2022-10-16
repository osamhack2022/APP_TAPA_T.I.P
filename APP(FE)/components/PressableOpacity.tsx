import { Pressable, PressableProps } from 'react-native'

type Props = PressableProps & {
	activeOpacity?: number
}

const PressableOpacity: React.FC<Props> = ({
	style,
	activeOpacity = 0.5,
	...props
}) => (
	<Pressable
		{...props}
		style={({ pressed }) => [
			pressed ? { opacity: activeOpacity } : { opacity: 1 },
			typeof style === 'function' ? style({ pressed }) : style,
		]}
	/>
)

export default PressableOpacity
