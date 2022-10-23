import { MessageType } from '@app-types/consult'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { userAtom } from '@store/atoms'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import React from 'react'
import { Text, View } from 'react-native'

type Props = {
	message: MessageType
}
const DMMessage: React.FC<Props> = ({ message }) => {
	const user = useAtomValue(userAtom)
	return (
		<View
			style={css`
				width: 100%;
				padding: 10px 20px;
				align-items: ${message.sender_id === user?.uid
					? 'flex-end'
					: 'flex-start'};
			`}
		>
			<Text
				style={css`
					color: ${message.sender_id === user?.uid ? COLOR.BRAND.MAIN : '#000'};
				`}
			>
				{message.content}
			</Text>
			<Text
				style={css`
					color: ${COLOR.GRAY.NORMAL(6)};
					font-size: 12px;
				`}
			>
				{DateTime.fromMillis(message.created_at * 1000).toFormat(
					'MM월 dd일 hh:mm',
				)}
				에 보냄
			</Text>
		</View>
	)
}
export default DMMessage
