import useAxios from '@hooks/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type StateType = {
	loading: boolean
	err: TypeError | null
	data: AxiosResponse | null
}
export const request = (config: AxiosRequestConfig) => {
	const axiosInstance = useAxios()(config)
	const [state, setState] = useState<StateType>({
		loading: true,
		err: null,
		data: null,
	})
	const [trigger, setTrigger] = useState(0)

	const refetch = () => {
		setState({
			...state,
			loading: true,
		})
		setTrigger(Date.now()) // 현재 시각으로 state를 업데이트해서 리렌더링
	}
	useEffect(() => {
		axiosInstance //axios는 url를 인자로 받아 데이터 요청
			.then(data => {
				//반환된 값은 then을 통해 가공
				setState({
					...state,
					loading: false,
					data,
				})
			})
			.catch(err => {
				setState({ ...state, loading: false, err })
			})
	}, [trigger])

	return { ...state, refetch }
}
