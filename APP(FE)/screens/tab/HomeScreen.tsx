import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { zodResolver } from '@hookform/resolvers/zod'
import useAxios from '@hooks/axios'
import { useSafeUserQuery } from '@hooks/data/user'
import { DateTime } from 'luxon'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { z } from 'zod'

const formSchema = z.object({
	content: z.string().min(1).max(200),
})

type FieldValues = z.infer<typeof formSchema>

const DiarySection: React.FC = () => {
	const axios = useAxios()
	const {
		control,
		handleSubmit,
		formState: { isValid, isSubmitting },
		...form
	} = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			content: '',
		},
	})

	const content = form.watch('content')

	const onSubmit = useCallback<SubmitHandler<FieldValues>>(
		async ({ content }) => {
			const res = await axios.post('/diary/new', {
				content,
			})
			console.log(res)
		},
		[],
	)

	return (
		<View>
			<Text
				style={css`
					font-size: 18px;
					font-family: ${FONT.Pretendard.BOLD};
				`}
			>
				📔
				{DateTime.now().toFormat('MM월 dd일')}의 기록
			</Text>
			<View
				style={css`
					margin-top: 4px;
					padding: 12px;
					border-radius: 8px;
					background: ${COLOR.GRAY.NORMAL(1)};
				`}
			>
				<Controller
					control={control}
					name="content"
					render={({ field }) => (
						<TextInput
							value={field.value}
							onBlur={field.onBlur}
							onChangeText={field.onChange}
							placeholderTextColor={COLOR.GRAY.NORMAL(7)}
							placeholder="🤔 오늘 어떤 일이 있었나요? 오늘의 기분은 어떤가요?"
							style={css`
								min-height: 120px;
							`}
							multiline
						/>
					)}
				/>
				<View
					style={css`
						margin-top: 4px;
						flex-direction: row;
						justify-content: space-between;
					`}
				>
					<Text
						style={css`
							align-self: flex-end;
							font-size: 12px;
							color: ${COLOR.BLACK(1)};
						`}
					>
						{content.length}/200
					</Text>
					<TPButton
						disabled={!isValid}
						loading={isSubmitting}
						onPress={handleSubmit(onSubmit)}
						size="small"
					>
						기록하기
					</TPButton>
				</View>
			</View>
		</View>
	)
}

const HomeScreen: React.FC = () => {
	const userQuery = useSafeUserQuery()

	return (
		<>
			<View
				style={css`
					flex: 1;
				`}
			>
				<ScrollView
					style={css`
						padding: 20px;
					`}
				>
					<View
						style={css`
							justify-content: flex-start;
						`}
					>
						<View
							style={css`
								flex-direction: row;
								align-items: center;
							`}
						>
							{!userQuery.isLoading && userQuery.data ? (
								<Text
									style={css`
										font-size: 24px;
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									{userQuery.data.name} {userQuery.data.rank}
								</Text>
							) : (
								<FadingDots />
							)}
							<Text
								style={css`
									font-size: 24px;
									font-family: ${FONT.Pretendard.BOLD};
								`}
							>
								님,
							</Text>
						</View>
						<Text
							style={css`
								font-size: 18px;
							`}
						>
							오늘도 좋은 하루 되세요! ☺️
						</Text>
					</View>
					<Spacer y={24} />
					<DiarySection />
				</ScrollView>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default HomeScreen
