import { CommentType, PostType } from '@app-types/community'
import { UserType } from '@app-types/user'
import AnimatedProgressBar from '@components/AnimatedProgressBar'
import PostSummary from '@components/community/PostSummary'
import DiaryList from '@components/DiaryList'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import PressableOpacity from '@components/PressableOpacity'
import SmartRefreshControl from '@components/SmartRefreshControl'
import Spacer from '@components/Spacer'
import Spinner from '@components/Spinner'
import TPButton from '@components/TPButton'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import useAxios from '@hooks/axios'
import { useRootStackNavigation } from '@navigators/RootStack'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useQuery } from '@tanstack/react-query'
import firebase from '@utils/firebase'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import React, { useCallback } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'

const SectionHeader: React.FC<{
	title: string
	rightButtonLabel?: string
	rightButtonAction?: () => void
}> = ({ title, rightButtonLabel, rightButtonAction }) => (
	<View
		style={css`
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		`}
	>
		<Text
			style={css`
				font-size: 18px;
				font-family: ${FONT.Pretendard.BOLD};
			`}
		>
			{title}
		</Text>
		<View
			style={css`
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
			`}
		>
			{rightButtonLabel && (
				<>
					<TPButton variant="inline" onPress={rightButtonAction}>
						{rightButtonLabel}
					</TPButton>
					<Entypo name="chevron-right" size={18} color={COLOR.BRAND.MAIN} />
				</>
			)}
		</View>
	</View>
)

const UserScreen: React.FC = () => {
	const navigation = useRootStackNavigation()
	const firebaseUser = useAtomValue(userAtom)
	const axios = useAxios()

	const userQuery = useQuery<{
		user: UserType
		posts: Record<string, Omit<PostType, 'id'>>
		comments: Record<string, CommentType>
	}>(
		['tapa', '/users/get/myself/detail'],
		async () => {
			const res = await axios.get('/users/get/myself/detail')
			return res.data
		},
		{
			enabled: !!firebaseUser,
		},
	)

	const refetch = (force?: boolean) => {
		if (force || userQuery.data) {
			userQuery.refetch()
		}
	}

	useFocusEffect(
		useCallback(() => {
			refetch()
		}, []),
	)

	if (userQuery.isLoading) {
		return (
			<View
				style={css`
					flex: 1;
					justify-content: center;
					align-items: center;
				`}
			>
				<Spinner />
			</View>
		)
	}

	if (!userQuery.data) {
		return (
			<View
				style={css`
					flex: 1;
					justify-content: center;
					align-items: center;
				`}
			>
				<Text
					style={css`
						font-size: 32px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					???? ???, ????????????!
				</Text>
				<Text
					style={css`
						margin-top: 4px;
						font-size: 16px;
						color: ${COLOR.BLACK(1)};
					`}
				>
					???????????? ???????????? ????????????
				</Text>
				<TPButton
					style={css`
						margin-top: 8px;
					`}
					size="small"
					onPress={() => refetch(true)}
				>
					?????? ????????????
				</TPButton>
			</View>
		)
	}

	const { user } = userQuery.data

	const posts = Object.keys(userQuery.data.posts)
		.reduce<PostType[]>(
			(acc, cur) => [
				...acc,
				{
					...userQuery.data.posts[cur],
					id: cur,
				},
			],
			[],
		)
		.filter((_, idx) => idx < 3)
		.sort((a, b) => b.updated_at - a.updated_at)

	// ??????????????? ????????? ??? ?????? ???????????????, ?????? ????????? ???????????? ????????? ????????? ?????????!
	const points =
		Object.values(userQuery.data.posts).reduce(
			(acc, cur) =>
				acc +
				Object.keys(cur.likes ?? {}).length * 10 +
				Object.keys(cur.views ?? {}).length * 1,
			0,
		) +
		Object.values(userQuery.data.comments).reduce(
			(acc, cur) => acc + 5 + Object.keys(cur.likes ?? {}).length * 10,
			0,
		)

	const serviceProgress =
		DateTime.now().diff(DateTime.fromMillis(user.enlisted_at)).as('seconds') /
		DateTime.fromMillis(user.discharged_at)
			.diff(DateTime.fromMillis(user.enlisted_at))
			.as('seconds')

	const serviceDaysLeft = Math.round(
		DateTime.fromMillis(user.discharged_at).diff(DateTime.now()).as('days'),
	)

	return (
		<>
			<ScrollView
				style={css`
					flex: 1;
					padding: 20px;
				`}
				contentInset={{ top: 0, bottom: 24 }}
				refreshControl={
					<SmartRefreshControl
						onRefresh={async () => {
							await userQuery.refetch()
						}}
						refreshing={userQuery.isRefetching}
					/>
				}
			>
				<View
					style={css`
						padding: 20px;
						border-radius: 12px;
						background: ${COLOR.GRAY.NORMAL(1)};
					`}
				>
					<View
						style={css`
							flex-direction: row;
							justify-content: space-between;
						`}
					>
						<View>
							<Text
								style={css`
									color: ${COLOR.BLACK(1)};
								`}
							>
								{user.affiliated_unit}
							</Text>
							<Text
								style={css`
									color: ${COLOR.BLACK(1)};
								`}
							>
								{user.position}
							</Text>
							<Text
								style={css`
									font-size: 32px;
									font-family: ${FONT.Pretendard.BOLD};
									color: ${COLOR.BLACK(7)};
								`}
							>
								{user.rank} {user.name}
							</Text>
						</View>
						<View>
							<PressableOpacity
								onPress={() => {
									Alert.alert('????????????', '????????? ???????????? ????????????????', [
										{
											text: '???, ???????????? ?????????',
											style: 'destructive',
											onPress: () => {
												firebase.auth.signOut()
											},
										},
										{
											text: '?????????!',
										},
									])
								}}
							>
								<Ionicons
									name="log-out"
									size={24}
									color={COLOR.GRAY.NORMAL(7)}
								/>
							</PressableOpacity>
						</View>
					</View>
					{serviceProgress > 0 && (
						<View
							style={css`
								margin-top: 12px;
							`}
						>
							<AnimatedProgressBar value={serviceProgress} />
							<View
								style={css`
									margin-top: 4px;
									flex-direction: row;
									justify-content: space-between;
								`}
							>
								<Text
									style={css`
										color: ${COLOR.BRAND.MAIN};
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									{(serviceProgress * 100).toFixed(2)}%
								</Text>
								<Text
									style={css`
										color: ${COLOR.BLACK(1)};
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									D-{serviceDaysLeft}
								</Text>
							</View>
						</View>
					)}
				</View>
				<Spacer y={24} />
				<SectionHeader
					title="???? ?????? POINT"
					rightButtonLabel="????????? ????????????"
					rightButtonAction={() => navigation.push('AboutTapaPoint')}
				/>
				<Spacer y={8} />
				<View
					style={css`
						position: relative;
						border-radius: 12px;
						overflow: hidden;
					`}
				>
					<Svg
						style={css`
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							padding: 20px;
						`}
					>
						<Defs>
							{/* @ts-ignore */}
							<LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
								<Stop offset="0" stopColor={COLOR.BRAND.TINT(3)} />
								<Stop offset="1" stopColor={COLOR.BRAND.MAIN} />
							</LinearGradient>
						</Defs>
						<Rect width="100%" height="100%" fill="url(#grad)" />
					</Svg>
					<View
						style={css`
							padding: 20px;
						`}
					>
						<View
							style={css`
								flex-direction: row;
								align-items: center;
								justify-content: space-between;
							`}
						>
							<Text
								style={css`
									font-size: 14px;
									font-family: ${FONT.Pretendard.BOLD};
									opacity: 0.7;
									color: #fff;
								`}
							>
								?????? ?????? ?????????
							</Text>
							<Text
								style={css`
									font-size: 24px;
									font-family: ${FONT.Pretendard.BOLD};
									color: #fff;
								`}
							>
								{points}pt
							</Text>
						</View>
						<Spacer y={12} />
						<View
							style={css`
								flex-direction: row;
								align-items: center;
								justify-content: space-between;
								align-items: center;
							`}
						>
							<View
								style={css`
									flex: 1;
									align-items: center;
								`}
							>
								<Text
									style={css`
										font-size: 14px;
										font-family: ${FONT.Pretendard.BOLD};
										opacity: 0.7;
										color: #fff;
									`}
								>
									?????? ?????? ??????
								</Text>
								<Text
									style={css`
										font-size: 24px;
										font-family: ${FONT.Pretendard.BOLD};
										color: #fff;
									`}
								>
									{Math.floor(points / 100)}???
								</Text>
							</View>

							<View
								style={css`
									flex: 1;
									align-items: center;
								`}
							>
								<Text
									style={css`
										font-size: 14px;
										font-family: ${FONT.Pretendard.BOLD};
										opacity: 0.7;
										color: #fff;
									`}
								>
									?????? ?????? ????????????
								</Text>
								<Text
									style={css`
										font-size: 24px;
										font-family: ${FONT.Pretendard.BOLD};
										color: #fff;
									`}
								>
									{Math.floor(points / 2000)}???
								</Text>
							</View>
						</View>
						<Spacer y={12} />
						<View>
							<View
								style={css`
									flex-direction: row;
									align-items: center;
									justify-content: space-between;
								`}
							>
								<Text
									style={css`
										font-size: 14px;
										font-family: ${FONT.Pretendard.BOLD};
										opacity: 0.7;
										color: #fff;
									`}
								>
									?????? ????????????
								</Text>
								<Text
									style={css`
										font-size: 14px;
										font-family: ${FONT.Pretendard.BOLD};
										color: #fff;
									`}
								>
									{100 - (points % 100)}pt
								</Text>
							</View>
							<Spacer y={4} />
							<AnimatedProgressBar
								value={(points % 100) / 100}
								color="#FFF"
								backgroundColor="#FFFFFF66"
							/>
							<Spacer y={4} />
						</View>
						<Spacer y={8} />
						<View>
							<View
								style={css`
									flex-direction: row;
									align-items: center;
									justify-content: space-between;
								`}
							>
								<Text
									style={css`
										font-size: 14px;
										font-family: ${FONT.Pretendard.BOLD};
										opacity: 0.7;
										color: #fff;
									`}
								>
									?????? ??????????????????
								</Text>
								<Text
									style={css`
										font-size: 14px;
										font-family: ${FONT.Pretendard.BOLD};
										color: #fff;
									`}
								>
									{2000 - (points % 2000)}pt
								</Text>
							</View>
							<Spacer y={4} />
							<AnimatedProgressBar
								value={(points % 2000) / 2000}
								color="#FFF"
								backgroundColor="#FFFFFF66"
							/>
							<Spacer y={4} />
						</View>
					</View>
				</View>
				<Spacer y={24} />
				<SectionHeader
					title="???? ?????? ?????? ????????????"
					rightButtonLabel="?????????"
					rightButtonAction={() => navigation.push('Diary')}
				/>
				<Spacer y={8} />
				<DiaryList limit={3} />
				<Spacer y={24} />
				<SectionHeader
					title="???? ?????? ?????????"
					rightButtonLabel="?????????"
					rightButtonAction={() => navigation.push('UserPostList')}
				/>
				<Spacer y={8} />
				{posts.map(post => (
					<PostSummary
						style={css`
							margin-bottom: 4px;
							border: solid ${COLOR.GRAY.NORMAL(2)} 1px;
							border-radius: 8px;
						`}
						post={post}
						size="default"
						key={post.id}
					/>
				))}
				<Spacer y={24} />
			</ScrollView>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default UserScreen
