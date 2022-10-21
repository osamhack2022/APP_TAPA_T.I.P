import OnBoarding from '@screens/onboarding'
import ResetPasswordScreen from '@screens/ResetPasswordScreen'
import SigninScreen from '@screens/SigninScreen'
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
					options={{
						title: '회원가입',
						headerShadowVisible: false,
						headerTitle: '',
						cardStyle: {
							backgroundColor: '#fff',
						},
					}}
				/>
				<RootStack.Screen
					name="SignIn"
					component={SigninScreen}
					options={{
						title: '로그인',
						headerShadowVisible: false,
						headerTitle: '',
						cardStyle: {
							backgroundColor: '#fff',
						},
					}}
				/>
				<RootStack.Screen
					name="ResetPassword"
					component={ResetPasswordScreen}
					options={{
						title: '비밀번호 초기화',
						headerShadowVisible: false,
						headerTitle: '',
						cardStyle: {
							backgroundColor: '#fff',
						},
					}}
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
