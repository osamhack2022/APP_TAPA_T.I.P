import AuthProvider from '@components/AuthProvider'
import MultiProvider from '@components/MultiProvider'
import TabNavigator from '@navigators/TabNavigator'
import { NavigationContainer } from '@react-navigation/native'

const App: React.FC = () => {
	return (
		<MultiProvider providers={[<AuthProvider />]}>
			<NavigationContainer>
				<TabNavigator />
			</NavigationContainer>
		</MultiProvider>
	)
}

export default App
