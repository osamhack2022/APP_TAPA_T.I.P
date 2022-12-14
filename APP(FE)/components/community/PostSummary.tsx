import { PostType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommunityNavigationParamList } from '@screens/tab/community/CommunityNavigator'
import { DateTime } from 'luxon'
import React from 'react'
import {
	Image,
	Pressable,
	StyleProp,
	Text,
	View,
	ViewStyle,
} from 'react-native'

import PostCountList from './PostCountList'
import UserProfile from './UserProfile'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityForum'
>

type Props = {
	size: 'small' | 'default' | 'large'
	post: PostType
	style?: StyleProp<ViewStyle>
}

const PostSummary: React.FC<Props> = ({ post, size, style }) => {
	const navigation = useNavigation<NavigationProp>()

	return (
		<Pressable
			style={({ pressed }) => [
				css`
					padding: 8px 20px;
					background: ${pressed ? COLOR.BRAND.TINT(1) : '#fff'};
				`,
				style,
			]}
			onPress={() => {
				console.log(post.id)
				navigation.navigate('CommunityPost', { postId: post.id })
			}}
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
						<UserProfile userName={post.username || '닉네임'} size="small" />
						<Text
							style={css`
								font-size: 10px;
								color: ${COLOR.GRAY.NORMAL(6)};
							`}
						>
							{DateTime.fromMillis(post.created_at * 1000).toFormat('MM.dd')}
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
							{size === 'small' && post.pic_url ? (
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
					{size !== 'small' && post.pic_url && (
						<Image
							source={{ uri: post.pic_url }}
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
							` | ${post.username} | ${DateTime.fromMillis(
								post.created_at * 1000,
							).toFormat('MM.dd')}`}
					</Text>
					<PostCountList post={post} />
				</View>
			</View>
		</Pressable>
	)
}

export default PostSummary
