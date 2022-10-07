import { atom } from 'jotai'

import { PostType } from '@/types/community'

export const postListAtom = atom<PostType[]>([])

export const currentPostAtom = atom<PostType | null>(null)
