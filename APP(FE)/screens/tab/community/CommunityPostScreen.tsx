import { PostType } from '@app-types/community'
import PostCountList from '@components/community/PostCountList'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import { samplePost } from '@constants/community'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/core'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getFullTime } from '@utils/time'
import { atom, useAtom } from 'jotai'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityPost'
>
type CommunityPostRouteProp = RouteProp<
	CommunityNavigationParamList,
	'CommunityPost'
>

const currentPostAtom = atom<PostType | null>(null)

const CommunityPostScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const {
		params: { postId },
	} = useRoute<CommunityPostRouteProp>()
	const [currentPost, setCurrentPost] = useAtom(currentPostAtom)
	const post: PostType = samplePost

	return (
		<ScrollView
			contentInset={{
				bottom: 24,
			}}
		>
			<View
				style={css`
					flex: 1;
					padding: 20px 20px;
				`}
			>
				<Text
					style={css`
						font-family: ${FONT.Pretendard.BOLD};
						font-size: 20px;
					`}
				>
					{post.title}
				</Text>
				<Spacer y={6} />
				<View
					style={css`
						flex-direction: row;
						justify-content: space-between;
					`}
				>
					<Text
						style={css`
							font-size: 10px;
						`}
					>
						{getFullTime(post.created_at)}
					</Text>
					<PostCountList post={post} type="simple" />
				</View>
				<Spacer y={6} />
				{post.image_url && (
					<>
						<Spacer y={10} />
						<AutoHeightImage
							source={{ uri: post.image_url }}
							width={Dimensions.get('window').width - 40}
						/>
						<Spacer y={10} />
					</>
				)}
				<Text
					style={css`
						font-family: ${FONT.Pretendard.REGULAR};
						font-size: 14px;
					`}
				>
					{post.content}
				</Text>
			</View>
			<FocusAwareStatusBar style="dark" />
		</ScrollView>
	)
}

export default CommunityPostScreen
