import ControlledTPTextInput from '@components/controlled/TPTextInput'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import TPModalSelect from '@components/TPModalSelect'
import { css } from '@emotion/native'
import { zodResolver } from '@hookform/resolvers/zod'
import { RootStackScreenProps } from '@navigators/RootStack'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { z } from 'zod'

import { RANK } from '@/constants/rank'

type Props = RootStackScreenProps<'SignUp'>

const formSchema = z
	.object({
		name: z.string(),
		email: z.string().email('이메일 형식을 확인해주세요!'),
		password: z
			.string()
			.regex(/.{8,}/, '최소 8자리 이상 입력해주세요!')
			.regex(/(?=.*[0-9])/, '숫자를 포함해주세요!')
			.regex(/(?=.*[a-z])/, '영문 알파벳을 포함해주세요!'),
		confirmPassword: z.string(),
		serviceNumber: z
			.string()
			.regex(/\d{2}-\d{5,8}/, '군번 형식을 확인해주세요!'),
		rank: z.string(),
		position: z.string(),
		affiliatedUnit: z.string(),
		enlistedAt: z.string(),
		dischargedAt: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: '비밀번호가 정확한지 확인해주세요!',
		path: ['confirmPassword'],
	})

type FieldValues = z.infer<typeof formSchema>

const SignupScreen: React.FC<Props> = props => {
	const {
		control,
		formState: { isValid, errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={24}
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
						padding: 48px 16px;
					`}
				>
					<Text
						style={css`
							font-size: 32px;
							font-weight: 700;
						`}
					>
						회원가입
					</Text>
					<View
						style={css`
							padding: 48px 0;
						`}
					>
						<ControlledTPTextInput
							name="name"
							control={control}
							label="이름"
							placeholder="이름을 입력해주세요"
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="email"
							control={control}
							keyboardType="email-address"
							label="이메일"
							placeholder="이메일을 입력해주세요"
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="password"
							control={control}
							keyboardType="ascii-capable"
							clearTextOnFocus={false}
							label="비밀번호"
							placeholder="비밀번호를 입력해주세요"
							helper="영문, 숫자를 포함한 8자리 이상의 비밀번호를 입력해주세요."
							secureTextEntry
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="confirmPassword"
							control={control}
							keyboardType="ascii-capable"
							clearTextOnFocus={false}
							label="비밀번호 확인"
							placeholder="비밀번호를 다시 입력해주세요"
							secureTextEntry
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="serviceNumber"
							control={control}
							keyboardType="number-pad"
							returnKeyType="done"
							label="군번"
							placeholder="군번을 입력해주세요"
							serialize={v => {
								if (!v) return v
								const stripped = v.replace(/[^\d]/g, '')
								if (stripped.length <= 2) {
									return stripped
								}
								return `${stripped.substring(0, 2)}-${stripped.substring(2)}`
							}}
						/>
						<Spacer y={16} />
						<TPModalSelect<string>
							label="계급"
							placeholder="계급을 선택해주세요"
							renderValue={value => value}
							keyExtractor={value => value}
							options={RANK}
							renderOption={value => value}
							modalStyle={css`
								padding: 0;
							`}
						/>
					</View>
				</View>
			</ScrollView>
			<View
				style={css`
					padding: 0 12px 48px 12px;
				`}
			>
				<TPButton>가입하기</TPButton>
			</View>
		</KeyboardAvoidingView>
	)
}

export default SignupScreen
