import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import {
	useChannelListQuery,
	useConsultantListQuery,
	useCreateChannelMutation,
} from '@hooks/data/consult'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'

import { ConsultNavigationParamList } from './ConsultNavigator'
type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultantDetail'
>
type ConsultDMRouteProp = RouteProp<
	ConsultNavigationParamList,
	'ConsultantDetail'
>

const ConsultantDetailScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const {
		params: { consultant },
	} = useRoute<ConsultDMRouteProp>()
	const channelList = useChannelListQuery()
	const createChannel = useCreateChannelMutation(consultant.user_id)
	const consultantQuery = useConsultantListQuery()
	const onPressDM = async () => {
		await createChannel.mutate()
		navigation.navigate('ConsultDM', {
			channel: channelList.data?.find(channel =>
				Object.keys(channel.participants).includes(consultant.user_id),
			),
		})
	}

	return (
		<View
			style={css`
				align-items: center;
			`}
		>
			<View
				style={css`
					width: 200px;
					height: 200px;
				`}
			></View>
			<Text
				style={css`
					font-family: ${FONT.Pretendard.BOLD};
					font-size: 20px;
				`}
			>
				{consultant.name} {consultant.position}
			</Text>
			<Spacer y={10} />
			<Text>{consultant.affiliated_unit}</Text>
			<Text>{consultant.email}</Text>
			<TPButton variant="primary" size="small" onPress={onPressDM}>
				<Text>1:1 상담하기</Text>
			</TPButton>
		</View>
	)
}
export default ConsultantDetailScreen
