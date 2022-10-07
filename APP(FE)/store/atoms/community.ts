import { atom } from 'jotai'

import { PostType } from '@/types/community'

export const postListAtom = atom<PostType[]>([])

export const currentPostAtom = atom<PostType | null>(null)

// export const getPostListAtom = atom(null, (_get, set) => {
// 	set(
// 		postListAtom,
// 		request({
// 			method: 'get',
// 			url: '/community/post/',
// 		}).data,
// 	)
// })
