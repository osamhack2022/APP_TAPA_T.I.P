export type ConsultantType = {
	affiliated_unit: string
	created_at: number
	discharged_at: number
	email: string
	enlisted_at: number
	name: string
	password: 'password'
	position: string
	rank: string
	updated_at: number
	username: string
	user_id: string
}

export type ChannelType = {
	last_message_id: string
	participants: string[]
	messages: string[]
	created_at: number
	updated_at: number
	channel_id: string
}

export type MessageType = {
	sender_id: string
	content: string
	created_at: number
}
