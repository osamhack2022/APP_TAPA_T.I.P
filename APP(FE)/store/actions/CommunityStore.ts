import { PostDetailType } from '@app-types/community'
import useAxios from '@hooks/axios'
import { userAtom } from '@store/atoms'
import {
	bestPostListAtom,
	commentListAtom,
	currentPostAtom,
	newPostListAtom,
	postListAtom,
} from '@store/atoms/community'
import { useAtomValue, useSetAtom } from 'jotai'
import { Alert } from 'react-native'

export const getPostList = async () => {
	const axios = useAxios()
	const setPostList = useSetAtom(postListAtom)
	const res = await axios.get(`/community/posts/`)
	setPostList(
		Object.keys(res.data).map((key, _) => {
			return { id: key, ...res.data[key] }
		}),
	)
}

export const getNewPostList = async () => {
	const axios = useAxios()

	const setNewPostList = useSetAtom(newPostListAtom)

	const res = await axios.get(`/community/new/`)
	setNewPostList(
		Object.keys(res.data).map((key, _) => {
			return { id: key, ...res.data[key] }
		}),
	)
}
export const getBestPostList = async () => {
	const axios = useAxios()

	const setBestPostList = useSetAtom(bestPostListAtom)
	const res = await axios.get(`/community/best/`)
	setBestPostList(
		Object.keys(res.data).map((key, _) => {
			return { id: key, ...res.data[key] }
		}),
	)
}
export const getPost = async (postId: string) => {
	const axios = useAxios()

	const setCurrentPost = useSetAtom(currentPostAtom)
	const setCommentList = useSetAtom(commentListAtom)
	const res = await axios.get<PostDetailType>(`/community/posts/${postId}`)
	setCurrentPost(res.data)
	setCommentList(
		Object.keys(res.data.comments).map((key, _) => {
			return { id: key, ...res.data.comments[key] }
		}),
	)
}
export const viewPost = async (postId: string) => {
	const axios = useAxios()

	const res = await axios.post(`/community/posts/${postId}/views`)
	getPost(postId)
}
export const likePost = async (postId: string) => {
	const axios = useAxios()

	const res = await axios.post(`/community/posts/${postId}/like`)
	getPost(postId)
}
export const deletePost = async (postId: string) => {
	const axios = useAxios()

	const res = await axios.delete(`/community/posts/${postId}`)
	getPostList()
}
export const submitComment = async (postId: string, content: string) => {
	const axios = useAxios()

	const user = useAtomValue(userAtom)
	if (content === '') {
		Alert.alert('댓글을 입력해 주세요!')
		return
	}
	const res = await axios.post(`/community/comment/${postId}`, {
		user_id: user?.uid,
		content,
	})
	getPost(postId)
}
