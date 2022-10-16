export type PostType = {
	id: number
	user_id: number
	author: string
	image_url: string
	title: string
	content: string
	views: number
	likes: number
	comments: number
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
