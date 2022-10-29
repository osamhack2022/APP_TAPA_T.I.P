import { ChannelType, ConsultantType } from '@app-types/consult'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ConsultNavigationParamList } from '@screens/tab/consult/ConsultNavigator'
import { DateTime } from 'luxon'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import images from '@/assets/images'
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
				padding: 10px 0px;
				flex-direction: row;
				align-items: center;
				border-bottom-width: 1px;
				border-color: ${COLOR.GRAY.NORMAL(3)};
			`}
			onPress={() =>
				navigation.navigate('ConsultDM', {
					channel: channel,
					consultant: consultant,
				})
			}
		>
			<Image
				source={images.consultantProfile[consultant.name]}
				style={{ width: 40, height: 40 }}
			/>
			<Spacer x={10} />
			<View
				style={css`
					flex-direction: column;
					flex: 1;
				`}
			>
				<Text
					style={css`
						font-family: ${FONT.Pretendard.BOLD};
						font-size: 16px;
					`}
				>
					{consultant.name} {consultant.position}
				</Text>
				<Spacer y={10} />
				<Text
					style={css`
						font-size: 12px;
						color: ${COLOR.GRAY.NORMAL(6)};
					`}
				>
					마지막 메세지 :{' '}
					{DateTime.fromMillis(channel.updated_at * 1000).toFormat(
						'MM월 dd일, hh:mm',
					)}
				</Text>
			</View>
			<FontAwesome5 name="chevron-right" />
		</Pressable>
	)
}

export default ConsultHistoryBox
