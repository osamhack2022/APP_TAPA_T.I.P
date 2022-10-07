import { PostType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

type Props = {
	post: PostType
}

const PostCountList: React.FC<Props> = ({ post }) => {
	return (
		<View
			style={css`
				flex-direction: row;
				align-items: center;
			`}
		>
			<Text
				style={css`
					font-size: 12px;
				`}
			>
				{post.views}
			</Text>
			<Spacer x={4} />
			<Entypo name="eye" />
			<Spacer x={4} />
			<Text
				style={css`
					font-size: 12px;
				`}
			>
				{/* {post.likes} */}
				{10}
			</Text>
			<Spacer x={4} />
			<Entypo name="thumbs-up" />
			<Spacer x={4} />
			<Text
				style={css`
					font-size: 12px;
				`}
			>
				{/* {post.comments} */}
				{10}
			</Text>
			<Spacer x={4} />
			<Entypo name="message" />
		</View>
	)
}
export default PostCountList
