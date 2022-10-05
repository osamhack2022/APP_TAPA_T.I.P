import { atom } from 'jotai'

import { PostType } from '@/lib/types/community'

export const postList = atom<PostType[]>([])

export const currentPost = atom<PostType | null>(null)
