import axios from 'axios'

import { API_BASE_URL } from '../../../constants'
import TokenHeader from '../TokenHeader'

export const GetRequest = <T = any>(url: string, params?: object) =>
	axios.get<T>(`${API_BASE_URL}${url}`, TokenHeader.getHeader())
export const PostRequest = <T = any>(url: string, body?: object) =>
	axios.post<T>(`${API_BASE_URL}${url}`, body, TokenHeader.getHeader())
export const PutRequest = <T = any>(
	url: string,
	body?: object,
	params?: object,
) => axios.put<T>(`${API_BASE_URL}${url}`, body, TokenHeader.getHeader(params))
export const DeleteRequest = <T = any>(url: string, params?: object) =>
	axios.delete<T>(`${API_BASE_URL}${url}`, TokenHeader.getHeader(params))
