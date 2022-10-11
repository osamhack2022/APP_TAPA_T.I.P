import { CommentType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { getFullTime } from '@utils/time'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import UserProfile from './UserProfile'
type Props = {
	comment: CommentType
	type?: 'comment' | 'reply'
}

const PostComment: React.FC<Props> = ({ comment, type = 'comment' }) => {
	return (
		<Pressable
			style={({ pressed }) => [
				css`
					padding: 6px 20px;
					background: ${pressed ? COLOR.BRAND.TINT(1) : '#fff'};
					flex-direction: row;
				`,
			]}
		>
			{type === 'reply' && (
				<MaterialIcons
					size={12}
					name="subdirectory-arrow-right"
					color={COLOR.GRAY.NORMAL(6)}
					style={{ marginRight: 6 }}
				/>
			)}
			<View
				style={css`
					flex: 1;
					flex-direction: column;
					width: 100%;
				`}
			>
				<View
					style={css`
						flex-direction: row;
						justify-content: space-between;
					`}
				>
					<UserProfile userName={comment.author} size="small" />
					<Pressable>
						<MaterialIcons name="more-vert" size={12} />
					</Pressable>
				</View>
				<Spacer y={4} />
				<Text
					style={css`
						font-size: 14px;
					`}
				>
					{comment.content}
				</Text>
				<Spacer y={2} />
				<View
					style={css`
						flex-direction: row;
					`}
				>
					<Text
						style={css`
							font-size: 10px;
							color: ${COLOR.GRAY.NORMAL(6)};
						`}
					>
						{getFullTime(comment.created_at)}
					</Text>
					<Spacer x={10} />
					<Text
						style={css`
							font-size: 10px;
							color: ${COLOR.ERROR};
						`}
					>
						{comment.likes}
					</Text>
					<Spacer x={4} />
					<FontAwesome5 size={10} name="thumbs-up" solid color={COLOR.ERROR} />
				</View>
			</View>
		</Pressable>
	)
}

export default PostComment
