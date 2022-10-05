import MultiProvider from '@components/MultiProvider'
import useAuth from '@hooks/auth'
import { RootStackParamList } from '@navigators/RootStack'
import RootStackNavigator from '@navigators/RootStackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Provider as JotaiProvider } from 'jotai'
import { useEffect } from 'react'
import { setCustomText, setCustomTextInput } from 'react-native-global-props'

import 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()
const App: React.FC = () => {
	const firebaseUser = useAuth()

	const [fontsLoaded] = useFonts({
		Pretendard: require('./assets/fonts/Pretendard/PretendardStd-Regular.otf'),
		PretendardBold: require('./assets/fonts/Pretendard/PretendardStd-Bold.otf'),
	})

	useEffect(() => {
		if (!fontsLoaded) {
			SplashScreen.preventAutoHideAsync()
		} else {
			SplashScreen.hideAsync()
			setCustomText({
				style: {
					fontFamily: 'Pretendard',
				},
			})
			setCustomTextInput({
				style: {
					fontFamily: 'Pretendard',
				},
			})
		}
	}, [fontsLoaded])

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
