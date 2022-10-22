import { ChannelType } from '@app-types/dm'
import useAxios from '@hooks/axios'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

export const useChannelListQuery = () => {
	const axios = useAxios()
	const user = useAtomValue(userAtom)
	const channelListQuery = useQuery<ChannelType[]>(
		['channelList'],
		async () => {
			const res = await axios.get(`/user/${user?.uid}/channels`)

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
