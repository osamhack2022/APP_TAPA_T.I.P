import ControlledTPTextInput from '@components/controlled/TPTextInput'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import TPModalSelect from '@components/TPModalSelect'
import { FONT } from '@constants/font'
import { RANK } from '@constants/rank'
import { css } from '@emotion/native'
import { zodResolver } from '@hookform/resolvers/zod'
import useAxios from '@hooks/axios'
import {
	RootStackScreenProps,
	useRootStackNavigation,
} from '@navigators/RootStack'
import firebase from '@utils/firebase'
import { formatDate, formatServiceNumber } from '@utils/format'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native'
import { DateTime } from 'luxon'
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

const DEFAULT_VALUES: FieldValues = {
	name: '신은수',
	email: 'me@esinx.net',
	password: 'password123',
	confirmPassword: 'password123',
	affiliatedUnit: '제2작전사령부 근무지원단',
	rank: '상병',
	serviceNumber: '21-72025276',
	position: '정작상황병',
	enlistedAt: '2021.10.19',
	dischargedAt: '2022.04.18',
}

const SignupScreen: React.FC<Props> = props => {
	const navigation = useRootStackNavigation()
	const axios = useAxios()

	const {
		control,
		handleSubmit,
		formState: { isValid },
		...form
	} = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: DEFAULT_VALUES,
	})

	const onSubmit = useCallback<SubmitHandler<FieldValues>>(
		async ({
			name,
			email,
			password,
			serviceNumber,
			dischargedAt,
			enlistedAt,
			rank,
			position,
			affiliatedUnit,
		}) => {
			try {
				const [enlistedAsTime, dischargedAsTime] = [
					enlistedAt,
					dischargedAt,
				].map(dateStr =>
					DateTime.fromFormat(dateStr, 'yyyy.MM.dd').toJSDate().getTime(),
				)
				/**
				 * TODO: tie user info with firebase credentials
				 */
				const credentials = await createUserWithEmailAndPassword(
					firebase.auth,
					email,
					password,
				)
				const res = await axios.post('/users/myself', {
					id: credentials.user.uid,
					username: credentials.user.uid,
					email: credentials.user.email,
					password: 'none',
					name,
					email_verified: credentials.user.emailVerified,
					service_number: serviceNumber,
					rank,
					position,
					affiliated_unit: affiliatedUnit,
					enlisted_at: enlistedAsTime,
					discharged_at: dischargedAsTime,
				})
				console.log(res.data)
				await firebase.auth.updateCurrentUser(credentials.user)
				navigation.pop()
			} catch (error) {
				console.error(error)
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
						회원가입
					</Text>
					<View
						style={css`
							padding: 24px 0;
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
							autoCapitalize="none"
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
							serialize={v => (v ? formatServiceNumber(v) : v)}
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
							value={form.watch('rank')}
							onChange={value =>
								value &&
								form.setValue('rank', value, {
									shouldValidate: true,
								})
							}
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="position"
							control={control}
							label="보직"
							placeholder="현재 보직을 입력해주세요"
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="affiliatedUnit"
							control={control}
							label="소속부대"
							placeholder="현재 소속부대를 입력해주세요"
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="enlistedAt"
							control={control}
							keyboardType="number-pad"
							returnKeyType="done"
							label="입대일"
							placeholder={DateTime.now().toFormat('yyyy.MM.dd')}
							serialize={v => (v ? formatDate(v) : v)}
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="dischargedAt"
							control={control}
							keyboardType="number-pad"
							returnKeyType="done"
							label="전역일"
							placeholder={DateTime.now().toFormat('yyyy.MM.dd')}
							serialize={v => (v ? formatDate(v) : v)}
						/>
					</View>
				</View>
			</ScrollView>
			<View
				style={css`
					padding: 0 12px 48px 12px;
				`}
			>
				<TPButton
					disabled={!isValid}
					size="large"
					onPress={handleSubmit(onSubmit)}
				>
					가입하기
				</TPButton>
			</View>
		</KeyboardAvoidingView>
	)
}

export default SignupScreen
