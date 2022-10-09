import { PostType } from '@app-types/community'
import ForumPostListItem from '@components/community/ForumPostListItem'
import PostWriteButton from '@components/community/PostWriteButton'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { samplePost } from '@constants/community'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { atom, useAtom } from 'jotai'
import { ScrollView, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

const postListAtom = atom<PostType[]>([])

const CommunityForumScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const [postList, setPostList] = useAtom(postListAtom)
	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<PostWriteButton />
			<ScrollView
				contentInset={{
					bottom: 24,
				}}
			>
				<ForumPostListItem post={samplePost} />
				<FocusAwareStatusBar style="dark" />
			</ScrollView>
		</View>
	)
}

export default CommunityForumScreen
