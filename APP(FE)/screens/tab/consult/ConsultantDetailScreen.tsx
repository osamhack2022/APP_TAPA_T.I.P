import {
	useChannelListQuery,
	useCreateChannelMutation,
} from '@hooks/data/consult'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { ConsultNavigationParamList } from './ConsultNavigator'
type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultantDetail'
>
type ConsultDMRouteProp = RouteProp<ConsultNavigationParamList, 'ConsultDM'>

const ConsultantDetailScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const {
		params: { userId },
	} = useRoute<ConsultDMRouteProp>()
	const channelList = useChannelListQuery()
	const createChannel = useCreateChannelMutation(userId)
	const onPressDM = () => {
		createChannel.mutate()
		navigation.navigate('ConsultDM', { userId: userId })
	}
	return (
		<View>
			<Pressable onPress={onPressDM}>
				<Text>상담 시작</Text>
			</Pressable>
		</View>
	)
}
export default ConsultantDetailScreen
