import ConsultantBox from '@components/consult/ConsultantBox'
import ConsultHistoryBox from '@components/consult/ConsultHistoryBox'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import {
	useChannelListQuery,
	useConsultantListQuery,
} from '@hooks/data/consult'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { userAtom } from '@store/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import { ConsultNavigationParamList } from './ConsultNavigator'

type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultHome'
>

const ConsultHomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const user = useAtomValue(userAtom)
	const channelQuery = useChannelListQuery()
	const consultantQuery = useConsultantListQuery()

	return (
		<>
			<View
				style={css`
					flex: 1;
				`}
			>
				<ScrollView>
					<View
						style={css`
							padding: 10px 20px;
							align-items: center;
						`}
					>
						<Text
							style={css`
								font-family: ${FONT.Pretendard.BOLD};
								font-size: 16px;
							`}
						>
							상담 신청
						</Text>
						<Spacer y={10} />
						{consultantQuery.data?.map(profile => {
							return <ConsultantBox profile={profile} key={profile.name} />
						})}
						<Spacer y={10} />
						<TPButton variant="inline" size="small">
							더보기
						</TPButton>
						<Spacer y={10} />
					</View>
					<Spacer y={10} />
					<View
						style={css`
							padding: 10px 20px;
							align-items: center;
						`}
					>
						<Text
							style={css`
								font-family: ${FONT.Pretendard.BOLD};
								font-size: 16px;
							`}
						>
							내 상담 내역
						</Text>
						<Spacer y={10} />
						{channelQuery.data &&
							channelQuery.data.map(channel => {
								return (
									<ConsultHistoryBox
										channel={channel}
										key={channel.channel_id}
									/>
								)
							})}
					</View>
				</ScrollView>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default ConsultHomeScreen
