import { Entypo, FontAwesome5, Fontisto } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AINavigator from '@screens/tab/AIScreen/AINavigator'
import CommunityScreen from '@screens/tab/CommunityScreen'
import ExpertScreen from '@screens/tab/ExpertScreen'
import HomeScreen from '@screens/tab/HomeScreen'
import UserScreen from '@screens/tab/UserScreen'

import { RootStackScreenProps } from './RootStackNavigator'

export type TabParamList = {
	Home: undefined
	Expert: undefined
	Community: undefined
	AI: undefined
	User: undefined
}

export const Tab = createBottomTabNavigator<TabParamList>()

const TabNavigator: React.FC<RootStackScreenProps<'Tab'>> = ({
	navigation,
	route,
}) => (
	<Tab.Navigator>
		<Tab.Screen
			name="Home"
			options={{
				title: '홈',
				tabBarIcon: ({ color, focused, size }) => (
					<Entypo name="home" {...{ color, size }} />
				),
			}}
			component={HomeScreen}
		/>
		<Tab.Screen
			name="Expert"
			options={{
				title: '전문가',
				tabBarIcon: ({ color, focused, size }) => (
					<Fontisto name="persons" {...{ color, size }} />
				),
			}}
			component={ExpertScreen}
		/>
		<Tab.Screen
			name="Community"
			options={{
				title: '커뮤니티',
				tabBarIcon: ({ color, focused, size }) => (
					<Entypo name="chat" {...{ color, size }} />
				),
			}}
			component={CommunityScreen}
		/>
		<Tab.Screen
			name="AI"
			options={{
				title: 'AI 상담',
				tabBarIcon: ({ color, focused, size }) => (
					<FontAwesome5 name="robot" {...{ color, size }} />
				),
			}}
			component={AINavigator}
		/>
		<Tab.Screen
			name="User"
			options={{
				title: '마이페이지',
				tabBarIcon: ({ color, focused, size }) => (
					<FontAwesome5 name="id-card" {...{ color, size }} />
				),
			}}
			component={UserScreen}
		/>
	</Tab.Navigator>
)

export default TabNavigator
