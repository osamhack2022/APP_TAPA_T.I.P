import { FONT } from '@constants/font'
import { FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
<<<<<<< Updated upstream
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
=======
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
				headerRightContainerStyle: {
					paddingRight: 12,
				},
				headerRight: props => {
					return (
						<Pressable
							onPress={() => {
								navigation.navigate('DM')
							}}
						>
							<FontAwesome5 name="envelope" solid size={20} />
						</Pressable>
					)
				},
				tabBarShowLabel: false,
>>>>>>> Stashed changes
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

export default TabNavigator
