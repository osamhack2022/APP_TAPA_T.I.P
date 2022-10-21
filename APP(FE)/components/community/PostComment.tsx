import { CommentType } from '@app-types/community'
import React from 'react'
import { View } from 'react-native'

type Props = {
	comment: CommentType
	type?: 'comment' | 'reply'
}

const PostComment: React.FC<Props> = ({ type = 'comment' }) => {
	return <View></View>
}

export default PostComment
