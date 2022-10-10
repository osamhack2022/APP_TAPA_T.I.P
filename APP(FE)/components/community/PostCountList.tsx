import { PostType } from '@app-types/community'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
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
					color: ${COLOR.BRAND.MAIN};
				`}
			>
				{post.views}
			</Text>
			<Spacer x={4} />
			<FontAwesome5 name="eye" solid color={COLOR.BRAND.MAIN} />
			<Spacer x={4} />
			<Text
				style={css`
					font-size: 12px;
					color: ${COLOR.ERROR};
				`}
			>
				{post.likes}
			</Text>
			<Spacer x={4} />
			<FontAwesome5 name="thumbs-up" solid color={COLOR.ERROR} />
			<Spacer x={4} />
			<Text
				style={css`
					font-size: 12px;
					color: #3e68ff;
				`}
			>
				{post.comments}
			</Text>
			<Spacer x={4} />
			<FontAwesome5 name="comment" solid color="#3E68FF" />
		</View>
	)
}
export default PostCountList
