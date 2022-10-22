import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import DMScreen from '../DMScreen'

import ConsultHomeScreen from './ConsultHomeScreen'
import DMListScreen from './DMListScreen'
export type ConsultNavigationParamList = {
	ConsultHome: undefined
	DMList: undefined
	DM: { userId: string }
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
				name="DMList"
				component={DMListScreen}
				options={{ title: 'DM' }}
			/>
			<Stack.Screen name="DM" component={DMScreen} options={{ title: 'DM' }} />
		</Stack.Navigator>
	)
}

export default ConsultNavigator
