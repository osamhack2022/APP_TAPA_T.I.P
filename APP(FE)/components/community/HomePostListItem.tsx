import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommunityNavigationParamList } from '@screens/tab/community/CommunityNavigator'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { PostType } from '@/types/community'

import PostCountList from './PostCountList'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

type Props = {
	post: PostType
}

const HomePostListItem: React.FC<Props> = ({ post }) => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<Pressable
			onPress={() => navigation.navigate('CommunityPost', { postId: post.id })}
		>
			<View
				style={css`
					padding: 8px 0px;
				`}
			>
				<Text
					style={css`
						font-size: 14px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					{post.title}
				</Text>
				<Spacer y={5} />
				<View
					style={css`
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
					`}
				>
					<Text
						style={css`
							font-size: 10px;
							color: ${COLOR.BLACK(6)};
						`}
					>
						질문게시판 | Xrong | 09.23{' '}
					</Text>
					<PostCountList post={post} />
				</View>
			</View>
		</Pressable>
	)
}

export default HomePostListItem
