import ControlledTPTextInput from '@components/controlled/TPTextInput'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { css } from '@emotion/native'
import { zodResolver } from '@hookform/resolvers/zod'
import { RootStackScreenProps } from '@navigators/RootStack'
import firebase from '@utils/firebase'
import { FirebaseError } from 'firebase/app'
import { sendPasswordResetEmail } from 'firebase/auth/react-native'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	View,
} from 'react-native'
import { z } from 'zod'

import { FONT } from '@/constants/font'

type Props = RootStackScreenProps<'ResetPassword'>

const formSchema = z.object({
	email: z.string().email('이메일 형식을 확인해주세요!'),
})

type FieldValues = z.infer<typeof formSchema>

const ResetPasswordScreen: React.FC<Props> = props => {
	const { navigation, route } = props

	const {
		control,
		handleSubmit,
		formState: { isValid, isSubmitting },
		...form
	} = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		mode: 'all',
		reValidateMode: 'onChange',
	})

	const onSubmit = useCallback<SubmitHandler<FieldValues>>(
		async ({ email }) => {
			try {
				const credentials = await sendPasswordResetEmail(firebase.auth, email)
				Alert.alert(
					'📧 비밀번호 초기화 메일을 보냈어요!',
					`📬 ${email}의 우편함을 확인해주세요! `,
				)
				navigation.pop()
			} catch (error) {
				if (error instanceof FirebaseError) {
					Alert.alert('오류', error.message)
				}
			}
		},
		[],
	)

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={72}
			enabled
			style={css`
				flex: 1;
			`}
		>
			<ScrollView
				contentInset={{
					bottom: 24,
				}}
			>
				<View
					style={css`
						padding: 24px 16px;
					`}
				>
					<Text
						style={css`
							font-size: 32px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						비밀번호 초기화
					</Text>
					<View
						style={css`
							padding: 24px 0;
						`}
					>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="email"
							control={control}
							keyboardType="email-address"
							label="이메일"
							placeholder="이메일을 입력해주세요"
							autoCapitalize="none"
						/>
					</View>
					<TPButton
						loading={isSubmitting}
						disabled={!isValid}
						size="large"
						onPress={handleSubmit(onSubmit)}
					>
						비밀번호 초기화 메일 받기
					</TPButton>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default ResetPasswordScreen
