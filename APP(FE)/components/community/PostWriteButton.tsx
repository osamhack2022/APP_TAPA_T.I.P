import TPButton from '@components/TPButton'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommunityNavigationParamList } from '@screens/tab/community/CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityForum'
>

const PostWriteButton: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()

	return (
		<TPButton
			variant="primary"
			onPress={() => navigation.navigate('CommunityWrite')}
			style={css`
				width: 52px;
				height: 52px;
				border-radius: 26px;
				justify-content: center;
				align-items: center;
				position: absolute;
				bottom: 20px;
				right: 20px;
				z-index: 1;
			`}
		>
			<Entypo name="pencil" size={24} color="#fff" />
		</TPButton>
	)
}

export default PostWriteButton
