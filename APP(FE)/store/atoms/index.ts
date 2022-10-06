import firebase from '@utils/firebase'
import { User } from 'firebase/auth/react-native'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(firebase.auth.currentUser)
