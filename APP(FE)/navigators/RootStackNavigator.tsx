import { useNavigation } from '@react-navigation/native'
import {
	createStackNavigator,
	StackNavigationProp,
	StackScreenProps,
} from '@react-navigation/stack'
import OnBoarding from '@screens/onboarding'

import TabNavigator from './TabNavigator'

export type RootStackParamList = {
	Tab: undefined
	OnBoarding: undefined
}
export type RootStackScreenProps<T extends keyof RootStackParamList> =
	StackScreenProps<RootStackParamList, T>

export const RootStack = createStackNavigator<RootStackParamList>()

export const useRootStackNavigation = useNavigation<
	StackNavigationProp<RootStackParamList>
>

const RootStackNavigator: React.FC = () => {
	return (
		<RootStack.Navigator initialRouteName="Tab" detachInactiveScreens>
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
