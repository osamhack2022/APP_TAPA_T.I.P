import { PostType } from '@app-types/community'
import PostComment from '@components/community/PostComment'
import PostCountList from '@components/community/PostCountList'
import UserProfile from '@components/community/UserProfile'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { sampleComment, samplePost } from '@constants/community'
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
				<UserProfile userName={post.author} size="large" />
				<Spacer y={6} />
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
			<View
				style={css`
					height: 6px;
					width: 100%;
					background-color: ${COLOR.GRAY.NORMAL(1)};
				`}
			/>
			<PostComment comment={sampleComment} />
			<PostComment comment={sampleComment} type="reply" />
			<PostComment comment={sampleComment} />
			<PostComment comment={sampleComment} />
			<FocusAwareStatusBar style="dark" />
		</ScrollView>
	)
}

export default CommunityPostScreen
