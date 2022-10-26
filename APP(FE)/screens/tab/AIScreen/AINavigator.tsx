import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import AICounselorScreen from './AICounselorScreen'
import AIHomeScreen from './AIHomeScreen'
import AIResultScreen from './AIResultScreen'

export type AINaviParamList = {
	AIHome: undefined
	AICounselor: undefined
	AIResult: { answer: number[] }
}

const Stack = createStackNavigator<AINaviParamList>()

const AINavigator: React.FC = () => {
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
				name="AIHome"
				component={AIHomeScreen}
				options={{ title: 'AI 상담' }}
			/>
			<Stack.Screen
				name="AICounselor"
				component={AICounselorScreen}
				options={{ title: 'AI 상담' }}
			/>
			<Stack.Screen
				name="AIResult"
				component={AIResultScreen}
				options={{ title: 'AI 상담' }}
			/>
		</Stack.Navigator>
	)
}

export default AINavigator
