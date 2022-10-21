import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

const useTrap = (options?: { enabled: boolean }) => {
	const navigation = useNavigation()
	useFocusEffect(
		useCallback(() => {
			if (!options || options.enabled) {
				navigation.setOptions({
					gestureEnabled: false,
					headerShown: false,
				})
			}
		}, [navigation, options, options?.enabled]),
	)
}

export default useTrap
