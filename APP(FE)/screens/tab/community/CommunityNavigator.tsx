import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import CommunityHomeScreen from './CommunityHomeScreen'
import CommunityPostScreen from './CommunityPostScreen'

export type CommunityNaviParamList = {
	CommunityHome: undefined
	CommunityPost: { postId: number }
}

const Stack = createStackNavigator<CommunityNaviParamList>()

const CommunityNavigator: React.FC = () => {
	// 타입선언 필요
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CommunityHome" component={CommunityHomeScreen} />
			<Stack.Screen name="CommunityPost" component={CommunityPostScreen} />
		</Stack.Navigator>
	)
}

export default CommunityNavigator
