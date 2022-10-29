import { userAtom } from '@store/atoms'
import axios, { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
const useAIAxios = () => {
	const user = useAtomValue(userAtom)
	const axiosInstance = useMemo(() => {
		const instance = axios.create({
			baseURL: 'http://20.214.182.219:8080',
		})
		instance.interceptors.request.use(async config => {
			const token = await user?.getIdToken()
			console.log(config.url)
			// console.log(config.data)
			// console.log(token)
			return {
				...config,
				headers: {
					...(config.headers ?? {}),
					Authorization: token,
				},
			}
		})
		instance.interceptors.response.use(undefined, async value => {
			if (value instanceof AxiosError) {
				console.error(
					`AxiosError(${value.response?.status}/${value.code}): ${value.message}\n${value.response?.data}`,
				)
			} else {
				console.error(value.response)
			}
			return value
		})
		return instance
	}, [user])
	return axiosInstance
}

export default useAIAxios
