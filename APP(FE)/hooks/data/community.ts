import { PostDetailType, PostType } from '@app-types/community'
import useAxios from '@hooks/axios'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

export const useBestPostListQuery = () => {
	const axios = useAxios()
	const postListQuery = useQuery<PostType[]>(['bestPostList'], async () => {
		const res = await axios.get(`/community/new/`)
		// const res = await axios.get(`/community/best/`)
		const data: PostType[] = Object.keys(res.data).map((key, _) => {
			return { id: key, ...res.data[key] }
		})
		return data
	})
	useFocusEffect(
		useCallback(() => {
			if (postListQuery.data) postListQuery.refetch()
		}, []),
	)
	return postListQuery
}

export const useNewPostListQuery = () => {
	const axios = useAxios()
	const postListQuery = useQuery<PostType[]>(['newPostList'], async () => {
		const res = await axios.get(`/community/new/`)
		const data = Object.keys(res.data)
			.map<PostType>((key, _) => {
				return { id: key, ...res.data[key] }
			})
			.sort((a, b) => b.created_at - a.created_at)
		return data
	})
	useFocusEffect(
		useCallback(() => {
			if (postListQuery.data) postListQuery.refetch()
		}, []),
	)
	return postListQuery
}

export const usePostListQuery = () => {
	const axios = useAxios()
	const postListQuery = useQuery<PostType[]>(['postList'], async () => {
		const res = await axios.get('/community/posts/')
		const data: PostType[] = Object.keys(res.data).map((key, _) => {
			return { id: key, ...res.data[key] }
		})
		return data
	})
	useFocusEffect(
		useCallback(() => {
			if (postListQuery.data) postListQuery.refetch()
		}, []),
	)
	return postListQuery
}

export const usePostQuery = (postId: string) => {
	const axios = useAxios()
	const postQuery = useQuery<PostDetailType>([`postDetail`], async () => {
		const res = await axios.get(`/community/posts/${postId}`)
		res.data.post.id = postId
		return res.data
	})
	useFocusEffect(
		useCallback(() => {
			if (postQuery.data) postQuery.refetch()
		}, []),
	)
	return postQuery
}

export const useViewMutation = (postId: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(
		() => {
			return axios.post(`/community/posts/${postId}/views`)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['postList'])
				queryClient.invalidateQueries(['postDetail'])
			},
		},
	)
	return res
}

export const useLikeMutation = (postId: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(
		() => {
			return axios.post(`/community/posts/${postId}/like`)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['postList'])
				queryClient.invalidateQueries(['postDetail'])
			},
		},
	)
	return res
}

export const useDeletePostMutation = (postId: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(
		() => {
			return axios.delete(`/community/posts/${postId}`)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['postList'])
			},
		},
	)
	return res
}

export const usePostCommentMutation = () => {
	type propsType = {
		content: string
		postId: string
	}
	const axios = useAxios()
	const user = useAtomValue(userAtom)
	const queryClient = useQueryClient()
	const res = useMutation(
		({ content, postId }: propsType) => {
			return axios.post(`/community/comment/${postId}`, {
				user_id: user?.uid,
				content,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['postDetail'])
			},
		},
	)
	return res
}

export const useLikeCommentMutation = (commentId: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(
		() => {
			return axios.post(`/community/comment/${commentId}/like`)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['postDetail'])
			},
		},
	)
	return res
}

export const useDeleteCommentMutation = (commentId: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(
		() => {
			return axios.delete(`/community/comment/${commentId}`)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['postDetail'])
			},
		},
	)
	return res
}
