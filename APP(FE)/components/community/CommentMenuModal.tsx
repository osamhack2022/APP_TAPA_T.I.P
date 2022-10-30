import { CommentType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import {
	useDeleteCommentMutation,
	useLikeCommentMutation,
} from '@hooks/data/community'
import { userAtom } from '@store/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Modal from 'react-native-modal'

type Props = {
	comment: CommentType
	open: boolean
	setOpen: (open: boolean) => void
}

const CommentMenuModal: React.FC<Props> = ({ comment, open, setOpen }) => {
	const axios = useAxios()
	const user = useAtomValue(userAtom)

	const likeComment = useLikeCommentMutation(comment.id)
	const deleteComment = useDeleteCommentMutation(comment.id)
	return (
		<Modal
			isVisible={open}
			onBackdropPress={() => {
				setOpen(false)
			}}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View
				style={css`
					width: 300px;
					background: #fff;
				`}
			>
				<Spacer y={10} />
				<Pressable
					style={css`
						padding: 16px 20px;
					`}
					onPress={() => {
						likeComment.mutate()
						setOpen(false)
					}}
				>
					<Text
						style={css`
							font-size: 14px;
						`}
					>
						{comment.likes && Object.keys(comment.likes).includes(user?.uid)
							? '추천 취소'
							: '추천'}
					</Text>
				</Pressable>
				{/* <Pressable
					style={css`
						padding: 16px 20px;
					`}
				>
					<Text
						style={css`
							font-size: 14px;
						`}
					>
						메세지 보내기
					</Text>
				</Pressable> */}
				{comment.user_id == user?.uid && (
					<Pressable
						style={css`
							padding: 16px 20px;
						`}
						onPress={() => {
							deleteComment.mutate()
							setOpen(false)
						}}
					>
						<Text
							style={css`
								font-size: 14px;
								color: ${COLOR.ERROR};
							`}
						>
							삭제
						</Text>
					</Pressable>
				)}
				<Spacer y={10} />
			</View>
		</Modal>
	)
}

export default CommentMenuModal
