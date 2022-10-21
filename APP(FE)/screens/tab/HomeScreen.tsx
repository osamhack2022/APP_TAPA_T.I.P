import Carousel from '@components/Carousel'
import EmotionPanel from '@components/EmotionPanel'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import useAxios from '@hooks/axios'
import { useSafeUserQuery } from '@hooks/data/user'
import { DateTime } from 'luxon'
import { useCallback, useMemo, useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
	Animated,
	ScrollView,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from 'react-native'
import { PagerViewOnPageSelectedEventData } from 'react-native-pager-view'
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

const TodaySection: React.FC = () => {
	const DATA = [
		{
			name: '부조리 신고',
			value: '12건',
		},
		{
			name: '부조리 해결',
			value: '8건',
		},
		{
			name: '상담가 매칭',
			value: '28명',
		},
		{
			name: '처벌 예측',
			value: '21회',
		},
	]

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
				{DATA.map((item, index) => (
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
							`}
						>
							{item.name}
						</Text>
						<Text
							style={css`
								font-size: 28px;
								font-family: ${FONT.Pretendard.BOLD};
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

const NewsSection: React.FC = () => {
	const DATA = [
		{
			new: true,
			name: '반의사불벌죄가 뭐길래!',
			value: '앗, 처벌을 원하지 않습니다!',
		},
		{
			name: '청원휴가는 언제, 어떻게 가는걸까?',
			value: '특별한 사유와 사례들',
		},
		{
			name: '초과근무의 기준이 궁금해요',
			value: '이렇게 근무하면 보상휴가를 받는걸까요?',
		},
	]

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
				{DATA.map((item, index) => (
					<View
						key={item.name}
						style={css`
							flex-direction: row;
							align-items: center;
							justify-content: space-between;
							margin-bottom: ${index + 1 < DATA.length ? '20px' : '0'};
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

const StatisticsSection: React.FC = () => {
	const dimensions = useWindowDimensions()

	const barWidth = useRef(0)
	const onPageScrollOffset = useRef(new Animated.Value(0)).current
	const onPageScrollPosition = useRef(new Animated.Value(0)).current
	const onPageSelectedPosition = useRef(new Animated.Value(0)).current

	const onPageScroll = useMemo(
		() =>
			Animated.event<PagerViewOnPageSelectedEventData>(
				[
					{
						nativeEvent: {
							offset: onPageScrollOffset,
							position: onPageScrollPosition,
						},
					},
				],
				{
					useNativeDriver: false,
				},
			),
		[],
	)

	const onPageSelected = useMemo(
		() =>
			Animated.event<PagerViewOnPageSelectedEventData>(
				[{ nativeEvent: { position: onPageSelectedPosition } }],
				{
					useNativeDriver: false,
				},
			),
		[],
	)

	const DATA = ['ACCIDENT-STREAK', 'EMOTIONS', 'ISSUES', 'STATISTICS']

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
			<View
				style={css`
					margin-top: 12px;
					padding: 0 20px;
				`}
			>
				<View
					onLayout={evt => (barWidth.current = evt.nativeEvent.layout.width)}
					style={css`
						overflow: hidden;
						border-radius: 4px;
						background: #ccc;
						height: 8px;
					`}
				>
					<Animated.View
						style={[
							css`
								border-radius: 4px;
								background: #111;
								height: 8px;
								width: 80px;
							`,
							{
								transform: [
									{
										translateX: Animated.divide(
											Animated.add(onPageScrollOffset, onPageScrollPosition),
											DATA.length - 1,
										).interpolate({
											inputRange: [0, 1],
											outputRange: [0, barWidth.current - 80],
										}),
									},
								],
							},
						]}
					/>
				</View>
			</View>
			<Carousel
				style={css`
					margin-top: 12px;
					min-height: 300px;
				`}
				overdrag
				onPageScroll={onPageScroll}
				onPageSelected={onPageSelected}
				data={DATA}
				keyExtractor={({ index }) => String(index)}
				renderItem={({ item, index }) => {
					switch (item) {
						case 'EMOTIONS':
							return (
								<View
									style={css`
										flex: 1;
										justify-content: space-between;
										padding: 20px;
									`}
								>
									<View>
										<Text
											style={css`
												font-size: 18px;
												font-family: ${FONT.Pretendard.BOLD};
											`}
										>
											우리부대 감정통계
										</Text>
										<Text
											style={css`
												font-size: 14px;
												color: ${COLOR.GRAY.NORMAL(7)};
											`}
										>
											우리부대 내에서 작성된 글과 일기장을 기반으로 감정 통계
											데이터를 분석해요
										</Text>
									</View>
									<EmotionPanel
										emotionData={{
											happiness: 0.31,
											sadness: 0.08,
											anger: 0.14,
											surprise: 0.13,
											anxious: 0.19,
											hurt: 0.15,
										}}
									/>
								</View>
							)

						default:
							return (
								<View
									style={css`
										flex: 1;
										align-items: center;
										justify-content: center;
									`}
								>
									<Text>
										{item}-{index}
									</Text>
								</View>
							)
					}
				}}
			/>
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
						<TodaySection />
					</View>
					<Spacer y={24} />
					<StatisticsSection />
					<Spacer y={24} />
					<View
						style={css`
							padding: 0 20px;
						`}
					>
						<NewsSection />
					</View>
				</ScrollView>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default HomeScreen
