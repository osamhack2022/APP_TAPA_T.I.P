import { PostType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommunityNavigationParamList } from '@screens/tab/community/CommunityNavigator'
import { getFullDate } from '@utils/time'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import PostCountList from './PostCountList'
import UserProfile from './UserProfile'

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
				{size === 'large' && (
					<View
						style={css`
							flex-direction: row;
							justify-content: space-between;
							margin-bottom: 4px;
						`}
					>
						<UserProfile userName={post.username} size="small" />
						<Text
							style={css`
								font-size: 10px;
								color: ${COLOR.GRAY.NORMAL(6)};
							`}
						>
							{getFullDate(post.created_at)}
						</Text>
					</View>
				)}
				<View
					style={css`
						flex-direction: row;
					`}
				>
					<View
						style={css`
							flex: 1;
							flex-direction: column;
						`}
					>
						<View
							style={css`
								flex-direction: row;
							`}
						>
							{size === 'small' && post.image_url ? (
								<>
									<FontAwesome5
										name="image"
										color={COLOR.BRAND.MAIN}
										size={16}
									/>
									<Spacer x={4} />
								</>
							) : null}
							<Text
								style={css`
									font-size: 14px;
									font-family: ${FONT.Pretendard.BOLD};
								`}
							>
								{post.title}
							</Text>
						</View>
						{size !== 'small' && (
							<Text
								style={css`
									font-size: 12px;
									margin-top: 5px;
								`}
								numberOfLines={size === 'default' ? 1 : 2}
								ellipsizeMode="tail"
							>
								{post.content}
							</Text>
						)}
					</View>
					{size !== 'small' && post.image_url && (
						<Image
							source={{ uri: post.image_url }}
							style={{
								width: 60,
								height: 48,
								borderRadius: 5,
								marginLeft: 4,
								resizeMode: 'cover',
							}}
						/>
					)}
				</View>
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
						질문게시판
						{size !== 'large' &&
							` | ${post.username} | ${getFullDate(post.created_at)}`}
					</Text>
					<PostCountList post={post} commentCount={0} />
				</View>
			</View>
		</Pressable>
	)
}

export default PostSummary
