import firebase from '@utils/firebase'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

const useAuth = () => {
	const [user, setUser] = useState<User | null>(firebase.auth.currentUser)
	useEffect(() => {
		const unsubscribe = firebase.auth.onAuthStateChanged(user => {
			if (user !== null) setUser(user)
		})
		return () => unsubscribe()
	}, [])
	return user
}

export default useAuth
