import { ChannelType, ConsultantType, MessageType } from '@app-types/consult'
import useAxios from '@hooks/axios'
import { userAtom } from '@store/atoms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

export const useConsultantListQuery = () => {
	const axios = useAxios()
	const user = useAtomValue(userAtom)
	const consultantListQuery = useQuery<ConsultantType[]>(
		['consultantList'],
		async () => {
			const res = await axios.get(`/counselors/`)
			return res.data
		},
	)

	return consultantListQuery
}

export const useChannelListQuery = () => {
	const axios = useAxios()
	const user = useAtomValue(userAtom)
	const channelListQuery = useQuery<ChannelType[]>(
		['channelList'],
		async () => {
			const res = await axios.get(`/channels/`)
			return res.data
		},
	)

	return channelListQuery
}

export const useChannelMessageQuery = (channelId: string) => {
	const axios = useAxios()
	const user = useAtomValue(userAtom)
	const channelMessageQuery = useQuery<MessageType[]>(
		['channelMessage'],
		async () => {
			const res = await axios.get(`/channels/${channelId}/all`)
			const messages: MessageType[] = Object.values(res.data)
			return messages
		},
	)

	return channelMessageQuery
}

export const useCreateChannelMutation = (userId: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(() => {
		return axios.post(`/channels/`, {
			user_id: userId,
		})
	})
	return res
}

export const usePostMessageMutation = (channelId: string, content: string) => {
	const axios = useAxios()
	const queryClient = useQueryClient()
	const res = useMutation(() => {
		return axios.post(`/channels/${channelId}`, {
			content,
		})
	})
	return res
}
