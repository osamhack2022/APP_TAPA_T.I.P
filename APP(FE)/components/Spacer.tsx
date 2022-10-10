import { StyleProp, View, ViewStyle } from 'react-native'

type Props = {
	x?: number
	y?: number
	style?: StyleProp<ViewStyle>
}

const Spacer: React.FC<Props> = ({ x, y, style }) => (
	<View style={[{ width: x ?? 0, height: y ?? 0 }, style]} />
)

export default Spacer
