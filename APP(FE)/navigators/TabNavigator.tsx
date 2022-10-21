import { FONT } from '@constants/font'
import { FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/core'
import { RouteProp } from '@react-navigation/native'
import AIScreen from '@screens/tab/AIScreen'
import CommunityNavigator from '@screens/tab/community/CommunityNavigator'
import ConsultScreen from '@screens/tab/ConsultScreen'
import HomeScreen from '@screens/tab/HomeScreen'
import UserScreen from '@screens/tab/UserScreen'
import { Pressable } from 'react-native'

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

}) => (
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
}) => {
	const getTabBarVisibility = (route: RouteProp<TabParamList, 'Community'>) => {
		const routeName = getFocusedRouteNameFromRoute(route)
		const hideOnScreens = ['CommunityWrite', 'CommunityForum', 'CommunityPost']
		return routeName ? hideOnScreens.indexOf(routeName) <= -1 : true
	}
	return (
		<Tab.Navigator
			screenOptions={{
				headerTitleStyle: {
					fontFamily: FONT.Pretendard.BOLD,
				},

			}}
			component={HomeScreen}
		/>
		<Tab.Screen
			name="Consult"
			options={{
				title: '상담',
				tabBarIcon: ({ color, focused, size }) => (
					<FontAwesome5 name="user-tie" {...{ color, size }} />
				),
			}}
			component={ConsultScreen}
		/>
		<Tab.Screen
			name="Community"
			options={{
				headerShown: false,
				title: '커뮤니티',
				tabBarIcon: ({ color, focused, size }) => (
					<FontAwesome5 name="comment-alt" solid {...{ color, size }} />
				),
			}}
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
=======
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
				name="Expert"
				options={{
					title: '전문가',
					tabBarIcon: ({ color, focused, size }) => (
						<FontAwesome5 name="user-tie" {...{ color, size }} />
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
>>>>>>> frontend

export default TabNavigator
