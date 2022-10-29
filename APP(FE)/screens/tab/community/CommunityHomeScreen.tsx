import PostSummary from '@components/community/PostSummary'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import SmartRefreshControl from '@components/SmartRefreshControl'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import useAxios from '@hooks/axios'
import {
	useBestPostListQuery,
	useNewPostListQuery,
} from '@hooks/data/community'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>
const CommunityHomeScreen: React.FC = () => {
	const axios = useAxios()
	const newPostListQuery = useNewPostListQuery()
	const bestPostListQuery = useBestPostListQuery()

	const navigation = useNavigation<NavigationProp>()

	return (
		<ScrollView
			contentInset={{
				bottom: 24,
			}}
			refreshControl={
				<SmartRefreshControl
					onRefresh={async () => {
						await newPostListQuery.refetch()
						await bestPostListQuery.refetch()
					}}
					refreshing={
						newPostListQuery.isRefetching || bestPostListQuery.isRefetching
					}
				/>
			}
		>
			<View
				style={css`
					flex: 1;
				`}
			>
				<Pressable
					style={({ pressed }) => [
						css`
							padding: 40px 20px;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;
							background: ${COLOR.BRAND.MAIN};
						`,
						pressed &&
							css`
								background: ${COLOR.BRAND.TINT(3)};
							`,
					]}
					onPress={() => navigation.navigate('CommunityForum')}
				>
					<View style={css``}>
						<Text
							style={css`
								font-size: 18px;
								font-family: ${FONT.Pretendard.BOLD};
								color: #ffffffcc;
							`}
						>
							도움이 필요한가요?
						</Text>
						<Text
							style={css`
								font-size: 32px;
								font-family: ${FONT.Pretendard.BOLD};
								color: #fff;
							`}
						>
							질문 게시판
						</Text>
						<Spacer y={4} />
						<Text
							style={css`
								font-size: 14px;
								color: #ffffffcc;
							`}
						>
							자신의 경험에 대해 자유롭게 질문하는 공간으로 오세요!
						</Text>
					</View>
					<Entypo name="chevron-right" size={32} color="#FFF" />
				</Pressable>
				<View
					style={css`
						width: 100%;
						padding: 10px 0px;
						background-color: white;
					`}
				>
					<Text
						style={css`
							margin-bottom: 10px;
							padding: 0px 20px;
							font-size: 20px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						👑 BEST
					</Text>
					{newPostListQuery.isLoading ? (
						<View
							style={css`
								align-items: center;
							`}
						>
							<FadingDots />
						</View>
					) : (
						bestPostListQuery.data?.map(item => {
							return <PostSummary size="large" post={item} key={item.id} />
						})
					)}
				</View>
				<Spacer y={4} />
				<View
					style={css`
						width: 100%;
						padding: 10px 0px;
						background-color: white;
					`}
				>
					<Text
						style={css`
							margin-bottom: 10px;
							padding: 0px 20px;
							font-size: 20px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						🪖 NEW
					</Text>
					{newPostListQuery.isLoading ? (
						<View
							style={css`
								align-items: center;
							`}
						>
							<FadingDots />
						</View>
					) : (
						newPostListQuery.data
							?.slice(-3)
							.reverse()
							.map(item => {
								return <PostSummary size="default" post={item} key={item.id} />
							})
					)}
				</View>
			</View>
			<FocusAwareStatusBar style="dark" />
		</ScrollView>
	)
}

export default CommunityHomeScreen
