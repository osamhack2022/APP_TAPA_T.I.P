import { CommentType } from '@app-types/community'
import CommentInput from '@components/community/CommentInput'
import PostComment from '@components/community/PostComment'
import PostCountList from '@components/community/PostCountList'
import UserProfile from '@components/community/UserProfile'
import FadingDots from '@components/FadingDots'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import TPToggleButtonWithValue from '@components/TPToggleButtonWithValue'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import {
	useLikeMutation,
	usePostQuery,
	useViewMutation,
} from '@hooks/data/community'
import { useNavigation } from '@react-navigation/core'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { userAtom } from '@store/atoms'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { Dimensions, KeyboardAvoidingView, Text, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import { CommunityNavigationParamList } from './CommunityNavigator'
import PostMenuModal from './PostMenuModal'

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

	const {
		params: { postId },
	} = useRoute<CommunityPostRouteProp>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const user = useAtomValue(userAtom)
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

	if (postQuery.isLoading) {
		return (
			<View
				style={css`
					align-items: center;
				`}
			>
				<FadingDots />
			</View>
		)
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
							<Pressable
								onPress={() => setModalOpen(true)}
								style={css`
									position: absolute;
									top: 20px;
									right: 20px;
									z-index: 1;
								`}
							>
								<MaterialIcons name="more-vert" size={20} />
							</Pressable>
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
									{DateTime.fromMillis(
										postQuery.data.post.created_at * 1000,
									).toFormat('yyyy.MM.dd  hh:mm')}
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
							</Text>
							<Spacer y={20} />
							<TPToggleButtonWithValue
								count={
									postQuery.data.post.likes
										? Object.keys(postQuery.data.post.likes).length
										: 0
								}
								title={'추천'}
								iconName="thumbs-up"
								active={
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
								padding: 10px;
								background-color: ${COLOR.GRAY.NORMAL(1)};
								flex-direction: row;
								align-items: center;
								justify-content: center;
							`}
						>
							<TPButton
								variant="inline"
								size="small"
								onPress={() =>
									navigation.navigate('CommunityEmotion', {
										post: postQuery.data.post,
									})
								}
							>
								이 게시물의 감정분석 결과 보기
							</TPButton>
							<MaterialIcons
								name="chevron-right"
								size={24}
								color={COLOR.BRAND.MAIN}
							/>
						</View>
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
						<CommentInput
							isKeyboardVisible={isKeyboardVisible}
							postId={postId}
						/>
					)}
				</KeyboardAccessoryView>
				<PostMenuModal
					post={postQuery.data.post}
					open={modalOpen}
					setOpen={setModalOpen}
				/>
			</View>
		)
}

export default CommunityPostScreen
