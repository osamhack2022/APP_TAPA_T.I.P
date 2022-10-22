import { ChannelDataType, ChannelType, MessageType } from '@app-types/consult'
import useAxios from '@hooks/axios'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

export const useChannelListQuery = () => {
	const axios = useAxios()
	const user = useAtomValue(userAtom)
	const channelListQuery = useQuery<{ userId: string; channelId: string }[]>(
		['channelList'],
		async () => {
			const res = await axios.get(`/channels/`)
			// Object.keys(res.data).map((key)=>{
			//   return {user_id: key, }
			// })
			return res.data
		},
	)
	useFocusEffect(
		useCallback(() => {
			if (channelListQuery.data) channelListQuery.refetch()
		}, []),
	)
	return channelListQuery
}

export const useChannelMessageQuery = (channelId: string) => {
	const axios = useAxios()
	const user = useAtomValue(userAtom)
	const channelMessageQuery = useQuery<ChannelType[]>(
		['channelMessage'],
		async () => {
			const channelRes = await axios.get<ChannelDataType>(
				`/channels/${channelId}`,
			)
			const messages: MessageType[] = channelRes.data.messages.map(
				async (messageId: string) => {
					const messageRes = await axios.get<MessageType>(
						`/channels/${channelId}/${messageId}`,
					)
					return messageRes.data
				},
			)
			const res: ChannelType = {
				last_message_id: channelRes.data.last_message_id,
				participants: channelRes.data.participants,
				created_at: channelRes.data.created_at,
				updated_at: channelRes.data.updated_at,
				messages: messages,
			}
			return res
		},
	)
	useFocusEffect(
		useCallback(() => {
			if (channelMessageQuery.data) channelMessageQuery.refetch()
		}, []),
	)
	return channelMessageQuery
}

export const useCreateChannelMutation = (userId: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(
		() => {
			return axios.post(`/channels/`, {
				user_id: userId,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['channelList'])
			},
		},
	)
	return res
}

export const usePostMessageMutation = (channelId: string, content: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(
		() => {
			return axios.post(`/channels/${channelId}`, {
				content,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['channelList'])
			},
		},
	)
	return res
}
