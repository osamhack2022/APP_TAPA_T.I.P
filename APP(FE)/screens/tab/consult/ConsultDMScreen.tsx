import { useChannelListQuery } from '@hooks/data/consult'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'

import { ConsultNavigationParamList } from './ConsultNavigator'

type ConsultDMRouteProp = RouteProp<ConsultNavigationParamList, 'ConsultDM'>

const ConsultDMScreen: React.FC = () => {
	const {
		params: { userId },
	} = useRoute<ConsultDMRouteProp>()
	const channelQuery = useChannelListQuery()
	return (
		<View>
			{channelQuery.data &&
				channelQuery.data.map(channel => {
					return (
						<View key={channel.channelId}>
							<Text>{channel.channelId}</Text>
						</View>
					)
				})}
		</View>
	)
}
export default ConsultDMScreen
