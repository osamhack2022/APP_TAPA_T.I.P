import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import AICounselorScreen from './AICounselorScreen'
import AIHomeScreen from './AIHomeScreen'
import AIResultScreen from './AIResultScreen'
export type AINaviParamList = {
	AIHome : undefined	
	AICounselor : undefined
	AIResult : {answer : number[]}
}

const Stack = createStackNavigator<AINaviParamList>()

const AINavigator: React.FC = () => {
	
	return (
		
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="AIHome" component={AIHomeScreen} />
				<Stack.Screen name="AICounselor" component={AICounselorScreen} />
				<Stack.Screen name ="AIResult" component = {AIResultScreen}></Stack.Screen>
			</Stack.Navigator>
		
	)
}

export default AINavigator