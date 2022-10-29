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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import extra from '@utils/extra'
import { sanitizeKey } from '@utils/firebase'
import { scheduleLocalNotification } from '@utils/notification'
import { useFonts } from 'expo-font'
import * as SecureStore from 'expo-secure-store'
import { Provider as JotaiProvider, useAtomValue } from 'jotai'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { LogBox, Platform, UIManager, View } from 'react-native'
import { setCustomText, setCustomTextInput } from 'react-native-global-props'

import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/en'

LogBox.ignoreAllLogs()

if (
	Platform.OS === 'android' &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true)
}

const queryClient = new QueryClient()

const Splash: React.FC = () => {
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

const RootNavigationContainer: React.FC = () => {
	const navigationContainerRef = useNavigationContainerRef<RootStackParamList>()
	const firebaseUser = useAtomValue(userAtom)
	return (
		<NavigationContainer<RootStackParamList>
			key={firebaseUser?.uid ?? 'RootNavigationContainer'}
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
				routes: firebaseUser
					? [
							{
								name: 'Tab',
							},
					  ]
					: [
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

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const [hasSavedCredentials, setHasSavedCredentials] = useState<boolean>()
	const firebaseUser = useAtomValue(userAtom)
	useAuthListener()

	useEffect(() => {
		;(async () => {
			const item = await SecureStore.getItemAsync(
				sanitizeKey(`firebase:authUser:${extra.firebase?.apiKey}:tapa`),
			)
			setHasSavedCredentials(!!item)
		})()
	}, [])

	if (
		typeof hasSavedCredentials === 'undefined' ||
		(hasSavedCredentials && !firebaseUser)
	) {
		return <Splash />
	}

	return <>{children}</>
}

const App: React.FC = () => {
	const [fontsLoaded] = useFonts({
		Pretendard: require('./assets/fonts/Pretendard/PretendardStd-Regular.otf'),
		PretendardBold: require('./assets/fonts/Pretendard/PretendardStd-Bold.otf'),
	})

	const didSendNotification = useRef(false)

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

	useEffect(() => {
		if (false && !didSendNotification.current) {
			didSendNotification.current = true
			const count = Math.floor(Math.random() * 2) + 1
			scheduleLocalNotification({
				title: '타파 리포트',
				message: `소속 부대 내 위험도가 높은 게시글 ${count}건이 발견되었어요`,
			}).then(() => {
				console.log('did trigger notification')
			})
		}
	}, [])

	if (!fontsLoaded) {
		return <Splash />
	}

	return (
		<MultiProvider
			providers={[
				<JotaiProvider />,
				<QueryClientProvider client={queryClient} />,
				<AuthGuard />,
			]}
		>
			<RootNavigationContainer />
		</MultiProvider>
	)
}

export default App
