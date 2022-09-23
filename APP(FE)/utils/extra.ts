import Constants from 'expo-constants'

import { DeepPartial } from './types'

type Extra = {
	backendBaseURL: string
	firebase: {
		apiKey: string
		appId: string
		authDomain: string
		databaseURL: string
		measurementId: string
		messagingSenderId: string
		projectId: string
		storageBucket: string
	}
}

const extra: DeepPartial<Extra> = Constants.manifest?.extra ?? {}
export default extra
