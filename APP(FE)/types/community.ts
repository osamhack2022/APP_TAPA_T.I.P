export type PostType = {
	id: string
	user_id: number
	author?: string
	image_url?: string
	title: string
	content: string
	views: number
	likes: number
	created_at: number
	updated_at: number
}

export type PostDetailType = {
	comments: CommentType[]
	post: PostType
}

export type CommentType = {
	id: number
	post_id: number
	user_id: number
	author: string
	content: string
	likes: number
	created_at: Date
	updated_at: Date
}
