import { atom } from 'jotai'

import { PostType } from '@/types/community'

export const postList = atom<PostType[]>([])

export const currentPost = atom<PostType | null>(null)