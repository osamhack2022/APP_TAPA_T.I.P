import { FONT } from '@constants/font'
import { Entypo, FontAwesome5, Fontisto } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/core'
import { RouteProp } from '@react-navigation/native'
import AIScreen from '@screens/tab/AIScreen'
import CommunityNavigator from '@screens/tab/community/CommunityNavigator'
import ExpertScreen from '@screens/tab/ExpertScreen'
import HomeScreen from '@screens/tab/HomeScreen'
import UserScreen from '@screens/tab/UserScreen'

import { RootStackScreenProps } from './RootStack'

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
}) => {
	const getTabBarVisibility = (route: RouteProp<TabParamList, 'Community'>) => {
		const routeName = getFocusedRouteNameFromRoute(route)
		const hideOnScreens = ['CommunityWrite', 'CommunityForum']
		return routeName ? hideOnScreens.indexOf(routeName) <= -1 : true
	}
	return (
		<Tab.Navigator
			screenOptions={{
				headerTitleStyle: {
					fontFamily: FONT.Pretendard.BOLD,
				},
				tabBarShowLabel: false,
			}}
		>
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
				options={({ route, navigation }) => ({
					headerShown: false,
					title: '커뮤니티',
					tabBarIcon: ({ color, focused, size }) => (
						<Entypo name="chat" {...{ color, size }} />
					),
					tabBarStyle: {
						display: getTabBarVisibility(route) ? 'flex' : 'none',
					},
				})}
				component={CommunityNavigator}
			/>
			<Tab.Screen
				name="AI"
				options={{
					title: 'AI 상담',
					tabBarIcon: ({ color, focused, size }) => (
						<FontAwesome5 name="robot" {...{ color, size }} />
					),
				}}
				component={AIScreen}
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
}

export default TabNavigator
