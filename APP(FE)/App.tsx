import AuthProvider from '@components/AuthProvider'
import MultiProvider from '@components/MultiProvider'
import RootStackNavigator, {
	RootStackParamList,
} from '@navigators/RootStackNavigator'
import { NavigationContainer } from '@react-navigation/native'

import 'react-native-gesture-handler'

const App: React.FC = () => {
	return (
		<MultiProvider providers={[<AuthProvider />]}>
			<NavigationContainer<RootStackParamList>
				initialState={{
					routes: [
						{
							name: 'Tab',
						},
						{
							name: 'OnBoarding',
						},
					],
				}}
			>
				<RootStackNavigator />
			</NavigationContainer>
		</MultiProvider>
	)
}

export default App
