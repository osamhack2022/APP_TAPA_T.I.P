import firebase from '@utils/firebase'
import { User } from 'firebase/auth'
import { useEffect } from 'react'

type Props = {
	onChange?: (user: User | null) => void
}

const AuthProvider: React.FC<React.PropsWithChildren<Props>> = ({
	onChange,
	children,
}) => {
	useEffect(() => {
		const unsubscribe = firebase.auth.onAuthStateChanged(user => {
			// set global user object here
			// 사용자가 onboarding을 완료하지 않은 상태에서 user가 falsy 값이면
			onChange?.(user)
		})
		return () => unsubscribe()
	}, [])
	return <>{children}</>
}

export default AuthProvider
