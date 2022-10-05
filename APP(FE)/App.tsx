import MultiProvider from '@components/MultiProvider'
import { TAPASquareIcon } from '@components/TPIcon'
import { css } from '@emotion/native'
import useAuth from '@hooks/auth'
import { RootStackParamList } from '@navigators/RootStack'
import RootStackNavigator from '@navigators/RootStackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Provider as JotaiProvider } from 'jotai'
import { useEffect } from 'react'
import { View } from 'react-native'
import { setCustomText, setCustomTextInput } from 'react-native-global-props'

import 'react-native-gesture-handler'

const App: React.FC = () => {
	const firebaseUser = useAuth()

	const [fontsLoaded] = useFonts({
		Pretendard: require('./assets/fonts/Pretendard/PretendardStd-Regular.otf'),
		PretendardBold: require('./assets/fonts/Pretendard/PretendardStd-Bold.otf'),
	})

	useEffect(() => {
		if (fontsLoaded) {
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

	if (!fontsLoaded) {
		return (
			<View
				style={css`
					flex: 1;
					align-items: center;
					justify-content: center;
				`}
			>
				<TAPASquareIcon />
			</View>
		)
	}

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
