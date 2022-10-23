import { PostType } from '@app-types/community'
import PostSummary from '@components/community/PostSummary'
import Spacer from '@components/Spacer'
import Spinner from '@components/Spinner'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { RootStackScreenProps } from '@navigators/RootStack'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { FONT } from '@/constants/font'

type Props = RootStackScreenProps<'CommunityPost'>

const UserPostListScreen: React.FC<Props> = props => {
	const { navigation, route } = props
	const axios = useAxios()
	const userQuery = useQuery<Record<string, Omit<PostType, 'id'>>>(
		['tapa', '/users/get/myself/detail', 'posts'],
		async () => {
			const res = await axios.get('/users/get/myself/detail')
			console.log(res.data)
			return res.data.posts
		},
	)

	useFocusEffect(
		useCallback(() => {
			userQuery.refetch()
		}, []),
	)

	const posts = userQuery.data
		? Object.keys(userQuery.data)
				.reduce<PostType[]>(
					(acc, cur) => [
						...acc,
						{
							...userQuery.data[cur],
							id: cur,
						},
					],
					[],
				)
				.sort((a, b) => b.updated_at - a.updated_at)
		: undefined

	return (
		<ScrollView
			contentInset={{
				bottom: 24,
			}}
		>
			<View
				style={css`
					padding: 24px 16px;
				`}
			>
				<Text
					style={css`
						font-size: 32px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					📝 나의 게시글
				</Text>
				<Spacer y={24} />
				{!posts && (
					<View
						style={css`
							align-items: center;
						`}
					>
						<Spinner />
					</View>
				)}
				{posts &&
					posts.map(post => (
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
			</View>
		</ScrollView>
	)
}

export default UserPostListScreen
