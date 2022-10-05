import { atom } from 'jotai'

import { GetRequest } from '@/lib/api/requests'
import { PostType } from '@/lib/types/community'

export const getPostList = atom(async get => {
	const response = await GetRequest<PostType[]>(`/commmunity/posts/`) // api 주소 나오면 변경
	const data = await response.data
	return data
})
