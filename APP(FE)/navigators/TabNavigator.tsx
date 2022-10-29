import { FONT } from '@constants/font'
import { FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/core'
import { RouteProp } from '@react-navigation/native'
import AIScreen from '@screens/tab/AIScreen'
import CommunityNavigator from '@screens/tab/community/CommunityNavigator'
import ConsultNavigator from '@screens/tab/consult/ConsultNavigator'
import HomeScreen from '@screens/tab/HomeScreen'
import UserScreen from '@screens/tab/UserScreen'

import { RootStackScreenProps } from './RootStack'

export type TabParamList = {
	Home: undefined
	Consult: undefined
	Community: undefined
	AI: undefined
	User: undefined
}

export const Tab = createBottomTabNavigator<TabParamList>()

const TabNavigator: React.FC<RootStackScreenProps<'Tab'>> = ({
	navigation,
	route,
}) => {
	const getTabBarVisibility = (
		route: RouteProp<TabParamList, 'Community' | 'Consult'>,
	) => {
		const routeName = getFocusedRouteNameFromRoute(route)
		const hideOnScreens = [
			'CommunityWrite',
			'CommunityForum',
			'CommunityPost',
			'ConsultDM',
		]
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
						<FontAwesome5 name="home" {...{ color, size }} />
					),
				}}
				component={HomeScreen}
			/>
			<Tab.Screen
				name="Consult"
				options={({ route, navigation }) => ({
					title: '전문 상담',
					headerShown: false,
					tabBarIcon: ({ color, focused, size }) => (
						<FontAwesome5 name="user-tie" {...{ color, size }} />
					),
					tabBarStyle: {
						display: getTabBarVisibility(route) ? 'flex' : 'none',
					},
				})}
				component={ConsultNavigator}
			/>
			<Tab.Screen
				name="Community"
				options={({ route, navigation }) => ({
					headerShown: false,
					title: '커뮤니티',
					tabBarIcon: ({ color, focused, size }) => (
						<FontAwesome5 name="comment-alt" solid {...{ color, size }} />
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
