import PostSummary from '@components/community/PostSummary'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import {
	useBestPostListQuery,
	useNewPostListQuery,
} from '@hooks/data/community'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

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
		>
			<View
				style={css`
					flex: 1;
					background-color: ${COLOR.GRAY.NORMAL(1)};
				`}
			>
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
				<Spacer y={4} />
				<View
					style={css`
						width: 100%;
						padding: 10px;
						align-items: center;
						justify-content: center;
						background-color: white;
					`}
				>
					<TPButton
						variant="inline"
						onPress={() => navigation.navigate('CommunityForum')}
					>
						게시판 바로가기
					</TPButton>
				</View>
				{/* <Pressable onPress={() => navigation.navigate('CommunityForum')}>
					<View
						style={css`
							width: 100%;
							padding: 10px 20px;
							background-color: white;
						`}
					>
						<Text
							style={css`
								font-size: 16px;
								font-family: ${FONT.Pretendard.BOLD};
							`}
						>
							게시판 글 모두 보기
						</Text>
						<Spacer y={5} />
						<Text>자신이 당한 일에 대해 자유롭게 질문하는 공간</Text>
					</View>
				</Pressable> */}
			</View>
			<FocusAwareStatusBar style="dark" />
		</ScrollView>
	)
}

export default CommunityHomeScreen
