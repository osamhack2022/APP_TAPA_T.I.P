import { PostType } from '@app-types/community'
import PostSummary from '@components/community/PostSummary'
import PostWriteButton from '@components/community/PostWriteButton'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { atom, useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

const postListAtom = atom<PostType[]>([])

const CommunityForumScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const [postList, setPostList] = useAtom(postListAtom)
	const axios = useAxios()

	const getPostList = async () => {
		const res = await axios.get(`/community/posts/`)
		setPostList(
			Object.keys(res.data).map((key, _) => {
				return { id: key, ...res.data[key] }
			}),
		)
	}

	useEffect(() => {
		getPostList()
	}, [])

	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<PostWriteButton />
			<ScrollView
				contentInset={{
					bottom: 24,
				}}
			>
				{postList &&
					postList.map(item => {
						return <PostSummary post={item} size="default" key={item.id} />
					})}
				<FocusAwareStatusBar style="dark" />
			</ScrollView>
		</View>
	)
}

export default CommunityForumScreen
