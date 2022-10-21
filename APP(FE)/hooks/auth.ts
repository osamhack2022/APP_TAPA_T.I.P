import { userAtom } from '@store/atoms'
import firebase from '@utils/firebase'
import { User } from 'firebase/auth/react-native'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

const useAuthListener = (onChange?: (user: User | null) => void) => {
	const setUser = useSetAtom(userAtom)
	useEffect(() => {
		const unsubscribe = firebase.auth.onAuthStateChanged(user => {
			setUser(user)
			onChange?.(user)
		})
		return () => unsubscribe()
	}, [onChange])
}

export default useAuthListener
