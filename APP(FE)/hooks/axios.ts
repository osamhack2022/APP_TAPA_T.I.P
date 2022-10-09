import { userAtom } from '@store/atoms'
import extra from '@utils/extra'
import axios from 'axios'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

const useAxios = () => {
	const user = useAtomValue(userAtom)
	const axiosInstance = useMemo(() => {
		const instance = axios.create({
			baseURL: extra.backendBaseURL,
		})
		instance.interceptors.request.use(
			async config => {
				const token = await user?.getIdToken()
				if (!token) return config
				return {
					...config,
					headers: {
						...(config.headers ?? {}),
						Authortization: `Bearer ${token}`,
					},
				}
			},
			error => {
				console.error(error)
				return Promise.reject(error)
			},
		)
		instance.interceptors.response.use(
			response => {
				const res = response.data
				return res
			},
			error => {
				console.error(error)
				return Promise.reject(error)
			},
		)
		return instance
	}, [user])
	return axiosInstance
}

export default useAxios
