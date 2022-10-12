import Spacer from '@components/Spacer'
import { css } from '@emotion/native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Modal from 'react-native-modal'

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
}

const PostReplyModal: React.FC<Props> = ({ open, setOpen }) => {
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
				>
					<Text
						style={css`
							font-size: 14px;
						`}
					>
						추천
					</Text>
				</Pressable>
				<Pressable
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
				</Pressable>
				<Spacer y={10} />
			</View>
		</Modal>
	)
}

export default PostReplyModal
