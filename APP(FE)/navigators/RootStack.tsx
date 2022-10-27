import { useNavigation } from '@react-navigation/native'
import {
	createStackNavigator,
	StackNavigationProp,
	StackScreenProps,
} from '@react-navigation/stack'

export type RootStackParamList = {
	Tab: undefined
	OnBoarding: undefined
	SignUp: {
		trap?: boolean
	}
	SignIn: {
		trap?: boolean
	}
	ResetPassword: undefined
	Diary: undefined
	UserPostList: undefined
	AboutTapaPoint: undefined
	CommunityPost: { postId: string }
}
export type RootStackScreenProps<T extends keyof RootStackParamList> =
	StackScreenProps<RootStackParamList, T>

export const RootStack = createStackNavigator<RootStackParamList>()

export const useRootStackNavigation = useNavigation<
	StackNavigationProp<RootStackParamList>
>
