import { ChannelType, ConsultantType } from '@app-types/consult'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import ConsultantDetailScreen from './ConsultantDetailScreen'
import ConsultDMScreen from './ConsultDMScreen'
import ConsultHomeScreen from './ConsultHomeScreen'
export type ConsultNavigationParamList = {
	ConsultHome: undefined
	ConsultantDetail: { consultant: ConsultantType }
	ConsultDM: { consultant: ConsultantType; channel: ChannelType }
}

const Stack = createStackNavigator<ConsultNavigationParamList>()

const ConsultNavigator: React.FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				headerBackTitleVisible: false,
				headerBackImage: () => (
					<Entypo
						name="chevron-left"
						size={24}
						style={css`
							padding: 10px;
						`}
					/>
				),
				headerTitleStyle: {
					fontFamily: FONT.Pretendard.BOLD,
				},
			}}
		>
			<Stack.Screen
				name="ConsultHome"
				component={ConsultHomeScreen}
				options={{
					title: '전문 상담',
				}}
			/>
			<Stack.Screen
				name="ConsultantDetail"
				component={ConsultantDetailScreen}
				options={{ title: '상담사' }}
			/>
			<Stack.Screen
				name="ConsultDM"
				component={ConsultDMScreen}
				options={{ title: 'DM' }}
			/>
		</Stack.Navigator>
	)
}

export default ConsultNavigator
