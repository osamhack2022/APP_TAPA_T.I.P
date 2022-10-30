import { PostType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { useDeletePostMutation } from '@hooks/data/community'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { userAtom } from '@store/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Modal from 'react-native-modal'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityPost'
>

type Props = {
	post: PostType
	open: boolean
	setOpen: (open: boolean) => void
}

const PostMenuModal: React.FC<Props> = ({ post, open, setOpen }) => {
	const navigation = useNavigation<NavigationProp>()

	const axios = useAxios()
	const user = useAtomValue(userAtom)

	const deletePost = useDeletePostMutation(post.id)
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
				{post.user_id == user?.uid && (
					<Pressable
						style={css`
							padding: 16px 20px;
						`}
						onPress={() => {
							deletePost.mutate()
							setOpen(false)
							navigation.pop()
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

export default PostMenuModal
