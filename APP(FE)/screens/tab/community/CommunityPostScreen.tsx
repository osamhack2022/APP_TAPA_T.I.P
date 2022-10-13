import { CommentType, PostDetailType } from '@app-types/community'
import PostComment from '@components/community/PostComment'
import PostCountList from '@components/community/PostCountList'
import UserProfile from '@components/community/UserProfile'
import Spacer from '@components/Spacer'
import TPTextInput from '@components/TPTextInput'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { useNavigation } from '@react-navigation/core'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getFullTime } from '@utils/time'
import { atom, useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Dimensions, KeyboardAvoidingView, Text, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityPost'
>
type CommunityPostRouteProp = RouteProp<
	CommunityNavigationParamList,
	'CommunityPost'
>

const currentPostAtom = atom<PostDetailType | null>(null)
const commentListAtom = atom<CommentType[]>([])

const CommunityPostScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const axios = useAxios()
	const {
		params: { postId },
	} = useRoute<CommunityPostRouteProp>()
	const [currentPost, setCurrentPost] = useAtom(currentPostAtom)
	const [commentList, setCommentList] = useAtom(commentListAtom)
	const insets = useSafeAreaInsets()

	const getPost = async () => {
		const res = await axios.get<PostDetailType>(`/community/posts/${postId}`)
		setCurrentPost(res.data)
		setCommentList(
			Object.keys(res.data.comments).map((key, _) => {
				return { id: key, ...res.data.comments[key] }
			}),
		)
	}

	useEffect(() => {
		getPost()
	}, [])

	if (!currentPost) {
		return null
	}
	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<KeyboardAvoidingView
				behavior="padding"
				style={css`
					flex: 1;
				`}
			>
				<ScrollView
					contentInset={{
						bottom: 140,
					}}
				>
					<View
						style={css`
							flex: 1;
							padding: 20px 20px;
						`}
					>
						<UserProfile userName={currentPost.post.username} size="large" />
						<Spacer y={6} />
						<Text
							style={css`
								font-family: ${FONT.Pretendard.BOLD};
								font-size: 20px;
							`}
						>
							{currentPost.post.title}
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
								{getFullTime(currentPost.post.created_at)}
							</Text>
							<PostCountList
								post={currentPost.post}
								commentCount={currentPost.comments.length}
								type="simple"
							/>
						</View>
						<Spacer y={6} />
						{currentPost.post.image_url && (
							<>
								<Spacer y={10} />
								<AutoHeightImage
									source={{ uri: currentPost.post.image_url }}
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
							{currentPost.post.content}
						</Text>
						{/* <TPToggleButtonWithValue
							count={currentPost.post.likes}
							title={'추천'}
              iconName="thumbs-up"
							toggle={false}
						/> */}
					</View>
					<View
						style={css`
							height: 6px;
							width: 100%;
							background-color: ${COLOR.GRAY.NORMAL(1)};
						`}
					/>
					{commentList.map(comment => {
						return (
							<PostComment comment={comment} key={comment.id} type="comment" />
						)
					})}
				</ScrollView>
			</KeyboardAvoidingView>
			<KeyboardAccessoryView
				alwaysVisible
				style={css`
					background: #fff;
				`}
			>
				{({ isKeyboardVisible }) => (
					<View
						style={css`
							padding: 8px 20px;
							height: 54px;
							padding-bottom: ${(isKeyboardVisible ? 8 : insets.bottom) + 'px'};
						`}
					>
						<TPTextInput
							returnKeyType="done"
							returnKeyLabel="추가"
							placeholder="댓글을 입력하세요"
							containerStyle={css`
								flex: 1;
							`}
							style={css`
								font-size: 14px;
								padding: 8px;
								border-radius: 8px;
							`}
							clearOnSubmit
							clearTextOnFocus
							blurOnSubmit={false}
						/>
					</View>
				)}
			</KeyboardAccessoryView>
		</View>
	)
}

export default CommunityPostScreen
