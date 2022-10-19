import { CommentType, PostDetailType, PostType } from '@app-types/community'
import { atom } from 'jotai'

export const postListAtom = atom<PostType[]>([])
export const newPostListAtom = atom<PostType[]>([])
export const bestPostListAtom = atom<PostType[]>([])
export const currentPostAtom = atom<PostDetailType | null>(null)
export const commentListAtom = atom<CommentType[]>([])
