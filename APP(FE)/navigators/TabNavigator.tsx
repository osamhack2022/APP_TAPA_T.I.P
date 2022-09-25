import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AIScreen from '@screens/tab/AIScreen'
import CommunityScreen from '@screens/tab/CommunityScreen'
import ExpertScreen from '@screens/tab/ExpertScreen'
import HomeScreen from '@screens/tab/HomeScreen'
import UserScreen from '@screens/tab/UserScreen'

type TabParamList = {
	Home: undefined
	Expert: undefined
	Community: undefined
	AI: undefined
	User: undefined
}

export const Tab = createBottomTabNavigator<TabParamList>()

const TabNavigator: React.FC = () => (
	<Tab.Navigator>
		<Tab.Screen name="Home" component={HomeScreen} />
		<Tab.Screen name="Expert" component={ExpertScreen} />
		<Tab.Screen name="Community" component={CommunityScreen} />
		<Tab.Screen name="AI" component={AIScreen} />
		<Tab.Screen name="User" component={UserScreen} />
	</Tab.Navigator>
)

export default TabNavigator
