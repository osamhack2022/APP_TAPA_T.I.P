export type ChannelDataType = {
	last_message_id: string
	participants: string[]
	messages: string[]
	created_at: number
	updated_at: number
}

export type ChannelType = {
	last_message_id: string
	participants: string[]
	messages: MessageType[]
	created_at: number
	updated_at: number
}

export type MessageType = {
	sender_id: string
	content: string
	created_at: number
}
