import { userAtom } from '@store/atoms'
import extra from '@utils/extra'
import axios, { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

const useAxios = () => {
	const user = useAtomValue(userAtom)
	const axiosInstance = useMemo(() => {
		const instance = axios.create({
			baseURL: extra.backendBaseURL,
		})
		instance.interceptors.request.use(async config => {
			const token = await user?.getIdToken()
			if (!token) return config
			return {
				...config,
				headers: {
					...(config.headers ?? {}),
					Authortization: `Bearer ${token}`,
				},
			}
		})
		instance.interceptors.response.use(undefined, async value => {
			if (value instanceof AxiosError) {
				console.error(
					`AxiosError(${value.response?.status}/${value.code}): ${value.message}\n${value.response?.data}`,
				)
			} else {
				console.error(value)
			}
			return value
		})
		return instance
	}, [user])
	return axiosInstance
}

export default useAxios
