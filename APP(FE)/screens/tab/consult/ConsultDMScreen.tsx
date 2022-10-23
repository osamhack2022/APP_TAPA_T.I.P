import {
	useChannelMessageQuery,
	useConsultantListQuery,
} from '@hooks/data/consult'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'

import { ConsultNavigationParamList } from './ConsultNavigator'

type ConsultDMRouteProp = RouteProp<ConsultNavigationParamList, 'ConsultDM'>

const ConsultDMScreen: React.FC = () => {
	const {
		params: { channel },
	} = useRoute<ConsultDMRouteProp>()
	const consultantList = useConsultantListQuery()
	const consultant = consultantList.data.find(c =>
		Object.keys(channel.participants).includes(c.user_id),
	)
	const messageQuery = useChannelMessageQuery(channel.channel_id)
	return (
		<View>
			<Text>{consultant?.name}</Text>
			{messageQuery.data?.map((message, index) => (
				<Text key={index}>{message.content}</Text>
			))}
		</View>
	)
}
export default ConsultDMScreen
