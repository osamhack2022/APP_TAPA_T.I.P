export type PostType = {
	id: string
	user_id: number
	username: string
	image_url?: string
	title: string
	content: string
	views: number
	likes: number
	comment_num: number
	comments: object
	created_at: number
	updated_at: number
}

export type PostDetailType = {
	comments: CommentType[]
	post: PostType
}

export type CommentType = {
	id: string
	post_id: string
	user_id: string
	username: string
	content: string
	likes: number
	created_at: number
	// updated_at: Date
}
