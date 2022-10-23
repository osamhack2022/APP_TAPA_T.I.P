import { CommentType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import CommentMenuModal from './CommentMenuModal'
import UserProfile from './UserProfile'
type Props = {
	comment: CommentType
	type?: 'comment' | 'reply'
}

const PostComment: React.FC<Props> = ({ comment, type = 'comment' }) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	return (
		<>
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
						<UserProfile userName={comment.username} size="small" />
						<Pressable onPress={() => setModalOpen(true)}>
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
							{DateTime.fromMillis(comment.created_at * 1000).toFormat(
								'MM.dd  hh:mm',
							)}
						</Text>
						<Spacer x={10} />
						{comment.likes && (
							<>
								<Text
									style={css`
										font-size: 10px;
										color: ${COLOR.ERROR};
									`}
								>
									{Object.keys(comment.likes).length}
								</Text>
								<Spacer x={4} />
								<FontAwesome5
									size={10}
									name="thumbs-up"
									solid
									color={COLOR.ERROR}
								/>
							</>
						)}
					</View>
				</View>
			</Pressable>
			<CommentMenuModal
				open={modalOpen}
				setOpen={setModalOpen}
				comment={comment}
			/>
		</>
	)
}

export default PostComment
