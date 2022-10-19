import { CommentType } from '@app-types/community'
import PostComment from '@components/community/PostComment'
import PostCountList from '@components/community/PostCountList'
import UserProfile from '@components/community/UserProfile'
import FadingDots from '@components/FadingDots'
import Spacer from '@components/Spacer'
import TPTextInput from '@components/TPTextInput'
import TPToggleButtonWithValue from '@components/TPToggleButtonWithValue'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import useAxios from '@hooks/axios'
import {
	useLikeMutation,
	usePostQuery,
	useViewMutation,
} from '@hooks/data/community'
import { useNavigation } from '@react-navigation/core'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { userAtom } from '@store/atoms'
import { getFullTime } from '@utils/time'
import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView } from 'react-native'
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

const CommunityPostScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const axios = useAxios()
	const {
		params: { postId },
	} = useRoute<CommunityPostRouteProp>()

	const [comment, setComment] = useState<string>('')
	const user = useAtomValue(userAtom)
	const insets = useSafeAreaInsets()

	const postQuery = usePostQuery(postId)
	const commentList: CommentType[] =
		!postQuery.isLoading && postQuery.data
			? Object.keys(postQuery.data.comments).map((key, _) => {
					return { id: key, ...postQuery.data?.comments[key] }
			  })
			: []

	const view = useViewMutation(postId)
	const like = useLikeMutation(postId)
	useEffect(() => {
		view.mutate()
	}, [])

	// const getPost = async () => {
	// 	const res = await axios.get<PostDetailType>(`/community/posts/${postId}`)
	// 	setpostQuery.data(res.data)
	// 	setCommentList(
	// 		Object.keys(res.data.comments).map((key, _) => {
	// 			return { id: key, ...res.data.comments[key] }
	// 		}),
	// 	)
	// }
	// const deletePost = async () => {
	// 	const res = await axios.delete(`/community/posts/${postId}`)

	// 	navigation.pop()
	// }

	const onSubmitComment = async (content: string) => {
		if (content === '') {
			Alert.alert('댓글을 입력해 주세요!')
			return
		}
		try {
			const res = await axios.post(`/community/comment/${postId}`, {
				user_id: user?.uid,
				content,
			})
		} catch (e) {}
	}

	if (postQuery.isLoading) {
		return <FadingDots />
	} else if (!postQuery.data) {
		return null
	} else
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
							{postQuery.data.post.user_id === user?.uid && (
								<Pressable
									style={css`
										position: absolute;
										top: 10px;
										right: 30px;
									`}
									// onPress={deletePost}
								>
									<FontAwesome5 name="trash" color={COLOR.ERROR} size={12} />
								</Pressable>
							)}
							<UserProfile
								userName={postQuery.data.post.username}
								size="large"
							/>
							<Spacer y={6} />
							<Text
								style={css`
									font-family: ${FONT.Pretendard.BOLD};
									font-size: 20px;
								`}
							>
								{postQuery.data.post.title}
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
									{getFullTime(postQuery.data.post.created_at)}
								</Text>
								<PostCountList post={postQuery.data.post} type="simple" />
							</View>
							<Spacer y={6} />
							{postQuery.data.post.pic_url && (
								<>
									<Spacer y={10} />
									<AutoHeightImage
										source={{ uri: postQuery.data.post.pic_url }}
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
								{postQuery.data.post.content}
								{postQuery.data.post.id}
							</Text>
							<TPToggleButtonWithValue
								count={
									postQuery.data.post.likes
										? Object.keys(postQuery.data.post.likes).length
										: 0
								}
								title={'추천'}
								iconName="thumbs-up"
								toggle={
									user &&
									postQuery.data.post.likes &&
									Object.keys(postQuery.data.post.likes).includes(user.uid)
										? true
										: false
								}
								onPress={() => like.mutate()}
							/>
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
								<PostComment
									comment={comment}
									key={comment.id}
									type="comment"
								/>
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
								padding: 0px 20px;
								height: 54px;
								padding-bottom: ${(isKeyboardVisible ? 8 : insets.bottom) +
								'px'};
								flex-direction: row;
								align-items: center;
							`}
						>
							<TPTextInput
								returnKeyType="done"
								returnKeyLabel="추가"
								placeholder="댓글을 입력하세요"
								containerStyle={css`
									flex: 1;
								`}
								clearOnSubmit
								onChangeText={text => {
									setComment(text)
								}}
								onSubmitEditing={() => {
									onSubmitComment(comment)
								}}
								style={css`
									font-size: 14px;
									padding: 8px;
									border-radius: 8px;
								`}
								clearTextOnFocus
								blurOnSubmit={false}
							/>
							<Pressable
								style={css`
									padding: 0px 10px;
								`}
								onPress={() => {
									onSubmitComment(comment)
								}}
							>
								<FontAwesome5
									name="paper-plane"
									size={16}
									solid
									color={COLOR.GRAY.NORMAL(6)}
								/>
							</Pressable>
						</View>
					)}
				</KeyboardAccessoryView>
			</View>
		)
}

export default CommunityPostScreen
