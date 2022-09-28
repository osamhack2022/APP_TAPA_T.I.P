import MultiProvider from '@components/MultiProvider'
import useAuth from '@hooks/auth'
import RootStackNavigator, {
	RootStackParamList,
} from '@navigators/RootStackNavigator'
import { NavigationContainer } from '@react-navigation/native'

import 'react-native-gesture-handler'

const App: React.FC = () => {
	const firebaseUser = useAuth()

	return (
		<MultiProvider providers={[]}>
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
