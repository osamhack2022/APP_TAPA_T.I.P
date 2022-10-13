import { PostType } from '@app-types/community'
import PostSummary from '@components/community/PostSummary'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { atom, useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>
const newPostListAtom = atom<PostType[]>([])
const bestPostListAtom = atom<PostType[]>([])

const CommunityHomeScreen: React.FC = () => {
	const [newPostList, setNewPostList] = useAtom(newPostListAtom)
	const [bestPostList, setBestPostList] = useAtom(bestPostListAtom)
	const axios = useAxios()

	const getNewPostList = async () => {
		const res = await axios.get(`/community/new/`)
		setNewPostList(
			Object.keys(res.data).map((key, _) => {
				return { id: key, ...res.data[key] }
			}),
		)
	}

	// const getBestPostList = async () => {
	// 	const res = await axios.get(`/community/best/`)
	// 	setBestPostList(
	// 		Object.keys(res.data).map((key, _) => {
	// 			return { id: key, ...res.data[key] }
	// 		}),
	// 	)
	// }

	useEffect(() => {
		getNewPostList()
		// getBestPostList()
	}, [])

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
							font-size: 16px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						BEST
					</Text>
					{bestPostList.map(item => {
						return <PostSummary size="large" post={item} key={item.id} />
					})}
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
							font-size: 16px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						NEW
					</Text>
					{newPostList.map(item => {
						return <PostSummary size="large" post={item} key={item.id} />
					})}
				</View>
				<Spacer y={4} />
				<Pressable onPress={() => navigation.navigate('CommunityForum')}>
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
							질문 게시판
						</Text>
						<Spacer y={5} />
						<Text>자신이 당한 일에 대해 자유롭게 질문하는 공간</Text>
					</View>
				</Pressable>
			</View>
			<FocusAwareStatusBar style="dark" />
		</ScrollView>
	)
}

export default CommunityHomeScreen
