import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import AICounselorScreen from './AICounselorScreen'
import AIHomeScreen from './AIHomeScreen'

export type AINaviParamList = {
	AIHome : undefined	
	AICounselor : undefined
}

const Stack = createStackNavigator<AINaviParamList>()

const AINavigator: React.FC = () => {
	
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="AIHome" component={AIHomeScreen} />
				<Stack.Screen name="AICounselor" component={AICounselorScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default AINavigator