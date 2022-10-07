import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import AICounselorScreen from './AICounselorScreen'
import AIHomeScreen from './AIHomeScreen'
import AIRecordScreen from './AIRecordScreen'

export type AINaviParamList = {
	AIHome : undefined	
	AICounselor : undefined
	AIRecord : undefined
}

const Stack = createStackNavigator<AINaviParamList>()

const AINavigator: React.FC = () => {
	
	return (
		
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="AIHome" component={AIHomeScreen} />
				<Stack.Screen name="AICounselor" component={AICounselorScreen} />
				<Stack.Screen name="AIRecord" component={AIRecordScreen}/>
			</Stack.Navigator>
		
	)
}

export default AINavigator