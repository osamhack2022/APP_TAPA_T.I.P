import ConsultDMInput from '@components/consult/ConsultDMInput'
import DMMessage from '@components/consult/DMMessage'
import FadingDots from '@components/FadingDots'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useChannelMessageQuery } from '@hooks/data/consult'
import { RouteProp, useRoute } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import { KeyboardAvoidingView, Text, View } from 'react-native'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import { ConsultNavigationParamList } from './ConsultNavigator'

type ConsultDMRouteProp = RouteProp<ConsultNavigationParamList, 'ConsultDM'>

const ConsultDMScreen: React.FC = () => {
	const {
		params: { channel, consultant },
	} = useRoute<ConsultDMRouteProp>()
	const user = useAtomValue(userAtom)
	const messageQuery = useChannelMessageQuery(channel.channel_id)
	const refreshList = () => {
		messageQuery.refetch()
	}
	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<KeyboardAvoidingView
				behavior="padding"
				style={css`
					flex: 1;
				`}
			>
				<View
					style={css`
						padding: 20px;
						align-items: center;
						background-color: ${COLOR.GRAY.NORMAL(1)};
					`}
				>
					<Text
						style={css`
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						{user?.email?.includes('counselor')
							? Object.keys(channel.participants)[0] ===
							  'caU3GxzaocVukcgVGrajwkGqxjk2'
								? '위험도 감지 알림 채널입니다.'
								: '익명의 장병과의 1:1 상담방입니다.'
							: `${consultant?.name} ${consultant?.position}님과의 1:1 상담방입니다.`}
					</Text>
				</View>
				{messageQuery.isFetching ? (
					<View
						style={css`
							flex: 1;
							align-items: center;
							justify-content: center;
						`}
					>
						<FadingDots />
					</View>
				) : (
					<>
						{!messageQuery.data || !messageQuery.data.length ? (
							<View
								style={css`
									flex: 1;
									align-items: center;
									justify-content: center;
								`}
							>
								<Text
									style={css`
										font-family: ${FONT.Pretendard.BOLD};
										line-height: 20px;
										text-align: center;
									`}
								>
									아직 상담 내역이 없습니다.{'\n'}지금 바로 상담을 시작해보세요!
								</Text>
							</View>
						) : (
							<View
								style={css`
									flex: 1;
									padding: 10px;
								`}
							>
								{messageQuery.data.map((message, index) => (
									<DMMessage key={index} message={message} />
								))}
							</View>
						)}
					</>
				)}
			</KeyboardAvoidingView>
			<KeyboardAccessoryView
				alwaysVisible
				style={css`
					background: #fff;
				`}
			>
				{({ isKeyboardVisible }) => (
					<ConsultDMInput
						isKeyboardVisible={isKeyboardVisible}
						channelId={channel.channel_id}
						refreshList={refreshList}
					/>
				)}
			</KeyboardAccessoryView>
		</View>
	)
}
export default ConsultDMScreen
