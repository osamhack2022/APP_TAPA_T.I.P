import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
	apiKey: '',
	appId: '',
	authDomain: '',
	databaseURL: '',
	measurementId: '',
	messagingSenderId: '',
	projectId: '',
	storageBucket: '',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const firebase = {
	app,
	auth,
}

export default firebase
