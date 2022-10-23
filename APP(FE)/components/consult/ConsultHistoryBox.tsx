import { ChannelType, ConsultantType } from '@app-types/consult'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ConsultNavigationParamList } from '@screens/tab/consult/ConsultNavigator'
import { DateTime } from 'luxon'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultHome'
>

type Props = {
	consultant: ConsultantType | undefined
	channel: ChannelType
}

const ConsultHistoryBox: React.FC<Props> = ({ channel, consultant }) => {
	const navigation = useNavigation<NavigationProp>()
	if (!consultant) return null
	return (
		<Pressable
			style={css`
				width: 100%;
				margin-bottom: 20px;
			`}
			onPress={() =>
				navigation.navigate('ConsultDM', {
					channel: channel,
					consultant: consultant,
				})
			}
		>
			<Text
				style={css`
					font-family: ${FONT.Pretendard.BOLD};
					font-size: 14px;
				`}
			>
				{consultant.name} {consultant.position}
			</Text>
			<Spacer y={10} />
			<Text
				style={css`
					font-size: 14px;
				`}
			>
				마지막 메세지 :{' '}
				{DateTime.fromMillis(channel.updated_at * 1000).toFormat(
					'MM월 dd일, hh:mm',
				)}
			</Text>
			<Spacer y={10} />
			<View
				style={css`
					height: 90px;
					background-color: ${COLOR.GRAY.NORMAL(2)};
				`}
			/>
		</Pressable>
	)
}

export default ConsultHistoryBox
