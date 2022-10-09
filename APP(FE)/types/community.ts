export type PostType = {
	id: number
	user_id: number
	title: string
	content: string
	views: number
	created_at: Date
	updated_at: Date
}

export type CommentType = {
	id: number
	post_id: number
	user_id: number
	content: string
	created_at: Date
	updated_at: Date
}
