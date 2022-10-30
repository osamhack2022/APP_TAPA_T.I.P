import { EmotionData } from '@components/EmotionPanel'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import DataCarousel from '@components/home/DataCarousel'
import Spacer from '@components/Spacer'
import Spinner from '@components/Spinner'
import TPButton from '@components/TPButton'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import useAxios from '@hooks/axios'
import { useSafeUserQuery } from '@hooks/data/user'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import React, { useCallback } from 'react'
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
			form.reset({
				content: '',
			})
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

const TodaySection: React.FC<{ data?: number[] }> = ({ data }) => {
	return (
		<View>
			<Text
				style={css`
					font-size: 24px;
					font-family: ${FONT.Pretendard.BOLD};
				`}
			>
				📆 타파는 오늘
			</Text>
			<View
				style={css`
					margin-top: 12px;
					padding: 20px;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					background: ${COLOR.GRAY.NORMAL(1)};
					border-radius: 12px;
				`}
			>
				{!data && (
					<View
						style={css`
							flex: 1;
							align-items: center;
							justify-content: center;
						`}
					>
						<Spinner />
					</View>
				)}
				{data &&
					[
						{
							name: '상담 요청',
							value: `${data[0]}건`,
							color: COLOR.ERROR,
						},
						{
							name: '상담가 매칭',
							value: `${data[1]}건`,
							color: COLOR.BRAND.BLUE,
						},
						{
							name: '위험감정 감지',
							value: `${data[2]}명`,
						},
						{
							name: '처벌 예측',
							value: `${data[3]}회`,
						},
					].map((item, index) => (
						<View
							key={item.name}
							style={css`
								align-items: center;
								justify-content: center;
							`}
						>
							<Text
								style={css`
									font-size: 12px;
									font-family: ${FONT.Pretendard.BOLD};
								`}
							>
								{item.name}
							</Text>
							<Text
								style={css`
									font-size: 28px;
									font-family: ${FONT.Pretendard.BOLD};
									color: ${item.color ?? COLOR.BRAND.MAIN};
								`}
							>
								{item.value}
							</Text>
						</View>
					))}
			</View>
		</View>
	)
}

const NewsSection: React.FC<{
	data?: {
		new?: boolean
		name: string
		value: string
	}[]
}> = ({ data }) => {
	return (
		<View>
			<Text
				style={css`
					font-size: 24px;
					font-family: ${FONT.Pretendard.BOLD};
				`}
			>
				📰 알쓸신잡 군법 가이드
			</Text>
			<Text
				style={css`
					font-size: 18px;
					color: ${COLOR.GRAY.NORMAL(7)};
				`}
			>
				법무관과 전문가가 알려주는 군법
			</Text>

			<View
				style={css`
					margin-top: 12px;
					padding: 20px;

					background: ${COLOR.GRAY.NORMAL(1)};
					border-radius: 12px;
				`}
			>
				{!data && (
					<View
						style={css`
							flex: 1;
							align-items: center;
							justify-content: center;
						`}
					>
						<Spinner />
					</View>
				)}
				{data &&
					data.map((item, index) => (
						<View
							key={item.name}
							style={css`
								flex-direction: row;
								align-items: center;
								justify-content: space-between;
								margin-bottom: ${index + 1 < data.length ? '20px' : '0'};
							`}
						>
							<View
								style={css`
									flex-direction: row;
									align-items: center;
								`}
							>
								<View>
									<Text
										style={css`
											font-size: 14px;
											font-family: ${FONT.Pretendard.BOLD};
										`}
									>
										{item.name}
									</Text>
									<Text
										style={css`
											font-size: 12px;
											color: ${COLOR.GRAY.NORMAL(7)};
										`}
									>
										{item.value}
									</Text>
								</View>
								{item.new && (
									<View
										style={css`
											border-radius: 4px;
											padding: 4px 6px;
											background: ${COLOR.BRAND.MAIN};
											margin-left: 12px;
										`}
									>
										<Text
											style={css`
												font-size: 12px;
												color: #fff;
											`}
										>
											NEW
										</Text>
									</View>
								)}
							</View>
							<Entypo
								name="chevron-right"
								size={24}
								color={COLOR.GRAY.NORMAL(6)}
							/>
						</View>
					))}
			</View>
		</View>
	)
}

const StatisticsSection: React.FC<
	React.ComponentProps<typeof DataCarousel>
> = ({ data }) => {
	return (
		<View>
			<View
				style={css`
					padding: 0 20px;
				`}
			>
				<Text
					style={css`
						font-size: 24px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					📚 DaTAPA
				</Text>
				<Text
					style={css`
						font-size: 18px;
						color: ${COLOR.GRAY.NORMAL(7)};
					`}
				>
					데이터와 통계로 보는 타파
				</Text>
			</View>
			<DataCarousel data={data} />
		</View>
	)
}

const HomeScreen: React.FC = () => {
	const userQuery = useSafeUserQuery()
	const axios = useAxios()
	const dataQuery = useQuery(['tapa', 'statistics'], async () => {
		const todayRes = await axios.get('/statistics/today')
		const emotionRes = await axios.get('/statistics/unit_emotion')
		const {
			counseling_request_count,
			counselor_alert_count,
			emotion_detection_count,
			punishment_prediction_count,
		} = todayRes.data

		const { count, total = 1 } = emotionRes.data

		return {
			today: [
				counseling_request_count,
				counselor_alert_count,
				emotion_detection_count,
				punishment_prediction_count,
			],
			emotions: Object.fromEntries(
				Object.entries(count).map(([key, value]) => [
					key,
					(value as number) / total,
				]),
			),
		}
	})

	const newsQuery = useQuery(['tapa', 'news:list'], async () => {
		const res = await axios.get('/news/list')
		return res.data
	})

	return (
		<>
			<View
				style={css`
					flex: 1;
				`}
			>
				<ScrollView
					style={css`
						padding: 20px 0;
					`}
					contentInset={{
						bottom: 48,
					}}
				>
					<View
						style={css`
							padding: 0 20px;
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
					<View
						style={css`
							padding: 0 20px;
						`}
					>
						<DiarySection />
					</View>
					<Spacer y={24} />
					<View
						style={css`
							padding: 0 20px;
						`}
					>
						<TodaySection data={dataQuery.data?.today} />
					</View>
					<Spacer y={24} />
					<StatisticsSection
						data={{
							emotions: dataQuery.data?.emotions as EmotionData,
						}}
					/>
					<Spacer y={24} />
					<View
						style={css`
							padding: 0 20px;
						`}
					>
						<NewsSection data={newsQuery.data} />
					</View>
				</ScrollView>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default HomeScreen
