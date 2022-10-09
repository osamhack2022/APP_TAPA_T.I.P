import MultiProvider from '@components/MultiProvider'
import { TAPASquareIcon } from '@components/TPIcon'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import useAuthListener from '@hooks/auth'
import { RootStackParamList } from '@navigators/RootStack'
import RootStackNavigator from '@navigators/RootStackNavigator'
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useFonts } from 'expo-font'
import { Provider as JotaiProvider, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { View } from 'react-native'
import { setCustomText, setCustomTextInput } from 'react-native-global-props'

import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/en'

const RootNavigationContainer: React.FC = () => {
	useAuthListener()
	const navigationContainerRef = useNavigationContainerRef<RootStackParamList>()
	const firebaseUser = useAtomValue(userAtom)
	return (
		<NavigationContainer<RootStackParamList>
			ref={navigationContainerRef}
			theme={{
				dark: false,
				colors: {
					primary: COLOR.BRAND.MAIN,
					notification: COLOR.BRAND.MAIN,
					text: COLOR.BLACK(2),
					border: COLOR.GRAY.NORMAL(2),
					background: '#fff',
					card: '#fff',
				},
			}}
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
			<RootStackNavigator key={firebaseUser?.uid ?? 'RootStackNavigator'} />
		</NavigationContainer>
	)
}

const App: React.FC = () => {
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
			<RootNavigationContainer />
		</MultiProvider>
	)
}

export default App
