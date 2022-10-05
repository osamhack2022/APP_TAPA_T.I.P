import MultiProvider from '@components/MultiProvider'
import useAuth from '@hooks/auth'
import { RootStackParamList } from '@navigators/RootStack'
import RootStackNavigator from '@navigators/RootStackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as JotaiProvider } from 'jotai'

import 'react-native-gesture-handler'

const App: React.FC = () => {
	const firebaseUser = useAuth()

	return (
		<MultiProvider providers={[<JotaiProvider />]}>
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
