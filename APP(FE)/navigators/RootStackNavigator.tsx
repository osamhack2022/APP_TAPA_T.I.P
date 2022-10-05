import OnBoarding from '@screens/onboarding'
import SignupScreen from '@screens/SignupScreen'

import { RootStack } from './RootStack'
import TabNavigator from './TabNavigator'

const RootStackNavigator: React.FC = () => {
	return (
		<RootStack.Navigator initialRouteName="Tab" detachInactiveScreens>
			<RootStack.Group
				key="modal-group"
				screenOptions={{
					presentation: 'modal',
				}}
			>
				<RootStack.Screen
					name="SignUp"
					component={SignupScreen}
					options={{ title: '회원가입', headerShown: false }}
				/>
			</RootStack.Group>
			<RootStack.Group key="main-group">
				<RootStack.Screen
					name="Tab"
					component={TabNavigator}
					options={{ headerShown: false, title: '메인' }}
				/>
			</RootStack.Group>
			<RootStack.Group
				key="onboarding-group"
				screenOptions={{
					presentation: 'modal',
				}}
			>
				<RootStack.Screen
					name="OnBoarding"
					component={OnBoarding}
					options={{ headerShown: false }}
				/>
			</RootStack.Group>
		</RootStack.Navigator>
	)
}

export default RootStackNavigator
