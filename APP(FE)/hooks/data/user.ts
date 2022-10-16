import { UserType } from '@app-types/user'
import useAxios from '@hooks/axios'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

export const useSafeUserQuery = () => {
	const firebaseUser = useAtomValue(userAtom)
	const axios = useAxios()

	const userQuery = useQuery<UserType>(
		['tapa', '/users/get/myself'],
		async () => {
			const res = await axios.get('/users/get/myself')
			return res.data
		},
		{
			enabled: !!firebaseUser,
		},
	)

	useFocusEffect(
		useCallback(() => {
			if (userQuery.data) userQuery.refetch()
		}, []),
	)

	return userQuery
}
