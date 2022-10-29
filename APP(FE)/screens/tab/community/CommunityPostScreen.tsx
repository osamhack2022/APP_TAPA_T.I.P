import { CommentType } from '@app-types/community'
import AnimatedProgressBar from '@components/AnimatedProgressBar'
import CommentInput from '@components/community/CommentInput'
import PostComment from '@components/community/PostComment'
import PostCountList from '@components/community/PostCountList'
import UserProfile from '@components/community/UserProfile'
import {
	EMOTION_COLORS,
	EMOTION_LABEL,
	EmotionKey,
} from '@components/EmotionPanel'
import FadingDots from '@components/FadingDots'
import Spacer from '@components/Spacer'
import Spinner from '@components/Spinner'
import TPButton from '@components/TPButton'
import TPToggleButtonWithValue from '@components/TPToggleButtonWithValue'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
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
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { Dimensions, KeyboardAvoidingView, Text, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import Modal from 'react-native-modal'

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

	const axios = useAxios()

	const emotionQuery = useQuery<{
		top_emotion: EmotionKey
		weighted_emotion_score: number
	}>(['tapa', '/community/emotion', postId], async ({ queryKey }) => {
		if (!queryKey[2]) {
			return {}
		}
		const res = await axios.get(`/diary/emotion/${queryKey[2]}`)
		if (Array.isArray(res)) {
			throw new Error('Invalid Data')
		}
		const data = Object.values(res.data)[0]
		return data as any
	})

	const [openEmotion, setOpenEmotion] = useState(false)

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
			<>
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
									onPress={() => setOpenEmotion(true)}
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

				<Modal
					isVisible={!!openEmotion}
					onBackdropPress={() => {
						setOpenEmotion(false)
					}}
				>
					<View
						style={[
							css`
								background: #fff;
								padding: 16px;
								border-radius: 12px;
							`,
						]}
					>
						<>
							{(emotionQuery.isFetching || emotionQuery.isRefetching) && (
								<View
									style={css`
										justify-content: center;
										align-items: center;
									`}
								>
									<Spinner />
								</View>
							)}
							{emotionQuery.error && (
								<Text>감정 데이터를 불러오지 못했어요!</Text>
							)}
							{emotionQuery.data && (
								<View>
									<Text
										style={css`
											font-size: 24px;
											font-family: ${FONT.Pretendard.BOLD};
										`}
									>
										감정 데이터 분석 결과
									</Text>
									<View
										style={css`
											margin-top: 12px;
											flex-direction: row;
											align-items: center;
											justify-content: space-between;
										`}
									>
										<Text
											style={css`
												font-size: 24px;
												font-family: ${FONT.Pretendard.BOLD};
												color: ${EMOTION_COLORS[emotionQuery.data.top_emotion]};
											`}
										>
											{EMOTION_LABEL[emotionQuery.data.top_emotion]}
										</Text>

										<Text
											style={css`
												font-size: 24px;
												font-family: ${FONT.Pretendard.BOLD};
											`}
										>
											{(
												Math.abs(emotionQuery.data.weighted_emotion_score) * 100
											).toFixed(2)}
											%
										</Text>
									</View>
									<AnimatedProgressBar
										color={EMOTION_COLORS[emotionQuery.data.top_emotion]}
										value={Math.abs(emotionQuery.data.weighted_emotion_score)}
									/>
									<View
										style={css`
											margin-top: 12px;
											flex-direction: row;
											align-items: center;
											justify-content: flex-end;
										`}
									>
										<FontAwesome5
											name="question-circle"
											size={12}
											color={COLOR.GRAY.NORMAL(5)}
										/>
										<Text
											style={css`
												margin-left: 4px;
												color: ${COLOR.GRAY.NORMAL(5)};
											`}
										>
											AI가 분석한 해당 글에 담긴 감정이에요
										</Text>
									</View>
								</View>
							)}
						</>
					</View>
				</Modal>
			</>
		)
}

export default CommunityPostScreen
