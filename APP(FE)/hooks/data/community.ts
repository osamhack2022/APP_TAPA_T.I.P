import { PostDetailType, PostType } from '@app-types/community'
import useAxios from '@hooks/axios'
import { useFocusEffect } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

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
	const postQuery = useQuery<PostDetailType>(
		['tapa', `postDetail`],
		async () => {
			const res = await axios.get(`/community/posts/${postId}`)
			return res.data
		},
	)
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
				queryClient.invalidateQueries(['postList', 'postDetail'], {
					refetchInactive: true,
				})
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
				queryClient.invalidateQueries(['postList', 'postDetail'], {
					refetchInactive: true,
				})
			},
		},
	)
	return res
}
