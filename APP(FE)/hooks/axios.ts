import extra from '@utils/extra'
import axios from 'axios'
import { useMemo } from 'react'

import useAuth from './auth'

const useAxios = () => {
	const user = useAuth()
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
		return instance
	}, [user])
	return axiosInstance
}

export default useAxios
