import { ChannelType } from '@app-types/consult'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ConsultNavigationParamList } from '@screens/tab/consult/ConsultNavigator'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultHome'
>

type Props = {
	channel: ChannelType
}

const ConsultHistoryBox: React.FC<Props> = ({ channel }) => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<Pressable
			style={css`
				width: 100%;
				margin-bottom: 20px;
			`}
			onPress={() =>
				navigation.navigate('ConsultDM', {
					channel: channel,
				})
			}
		>
			<View
				style={css`
					flex-direction: row;
					justify-content: space-between;
				`}
			>
				<Text
					style={css`
            font-family: ${FONT.Pretendard.BOLD}
            font-size: 14px;
          `}
				>
					{channel.participants[0]}
				</Text>
				<Text
					style={css`
            font-family: ${FONT.Pretendard.REGULAR}
            font-size: 12px;
            `}
				>
					읽지 않음
				</Text>
			</View>
			<Spacer y={10} />
			<Text
				style={css`
        font-family: ${FONT.Pretendard.REGULAR}
        font-size: 14px;
        `}
			>
				{channel.last_message_id}
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
