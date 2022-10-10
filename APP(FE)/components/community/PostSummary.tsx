import { PostType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommunityNavigationParamList } from '@screens/tab/community/CommunityNavigator'
import { getFullDate } from '@utils/time'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import PostCountList from './PostCountList'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityForum'
>

type Props = {
	size: 'small' | 'default' | 'large'
	post: PostType
}

const PostSummary: React.FC<Props> = ({ post, size }) => {
	const navigation = useNavigation<NavigationProp>()

	return (
		<Pressable
			style={({ pressed }) => [
				css`
					padding: 8px 20px;
					background: ${pressed ? COLOR.BRAND.TINT(1) : '#fff'};
				`,
			]}
			onPress={() => navigation.navigate('CommunityPost', { postId: post.id })}
		>
			<View>
				<Text
					style={css`
						font-size: 14px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					{post.title}
				</Text>
				{size !== 'small' && (
					<>
						<Spacer y={5} />
						<Text
							style={css`
								font-size: 12px;
							`}
							numberOfLines={size === 'default' ? 1 : 2}
							ellipsizeMode="tail"
						>
							{post.content}
						</Text>
					</>
				)}
				<Spacer y={size === 'small' ? 2 : 4} />
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
							color: ${COLOR.GRAY.NORMAL(6)};
						`}
					>
						질문게시판 | {post.author} | {getFullDate(post.created_at)}
					</Text>
					<PostCountList post={post} />
				</View>
			</View>
		</Pressable>
	)
}

export default PostSummary
