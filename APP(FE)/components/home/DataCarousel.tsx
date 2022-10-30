import Carousel from '@components/Carousel'
import EmotionPanel, { EmotionData } from '@components/EmotionPanel'
import Spacer from '@components/Spacer'
import Spinner from '@components/Spinner'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useMemo, useRef } from 'react'
import { Animated, Text, useWindowDimensions, View } from 'react-native'
import { PagerViewOnPageSelectedEventData } from 'react-native-pager-view'

const RankingEntry: React.FC<{
	data: {
		name: string
		ranking: number
	}
}> = ({ data: { name, ranking } }) => (
	<View
		style={css`
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 8px;
			padding: 12px 8px;
			background: #fff;
			border-radius: 8px;
		`}
	>
		<Text
			style={css`
				font-size: 14px;
				font-family: ${FONT.Pretendard.BOLD};
				color: ${COLOR.BRAND.MAIN};
			`}
		>
			#{ranking}
		</Text>
		<Text
			style={css`
				font-size: 12px;
				font-family: ${FONT.Pretendard.BOLD};
				color: ${COLOR.BLACK(6)};
			`}
		>
			{name}
		</Text>
	</View>
)

const DataCarousel: React.FC<{
	data?: {
		// accidentStreaks: { name: string; value: number }[]
		emotions: EmotionData
		// issues: {
		// 	most: { name: string; ranking: number }[]
		// 	least: { name: string; ranking: number }[]
		// }
	}
}> = ({ data }) => {
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

	// const DATA = ['ACCIDENT-STREAK', 'EMOTIONS', 'ISSUES']
	const DATA = ['EMOTIONS-1', 'EMOTIONS-2']

	const {
		emotions = {
			anger: 0,
			anxious: 0,
			happiness: 0,
			hurt: 0,
			sadness: 0,
			surprise: 0,
		},
	} = data ?? {}

	return (
		<>
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
						background: ${COLOR.BRAND.TINT(2)};
						height: 8px;
					`}
				>
					<Animated.View
						style={[
							css`
								border-radius: 4px;
								background: ${COLOR.BRAND.MAIN};
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
					if (!data)
						return (
							<View
								style={css`
									flex: 1;
									justify-content: center;
									align-items: center;
								`}
							>
								<Spinner />
							</View>
						)
					switch (item) {
						// case 'ACCIDENT-STREAK':
						// 	return (
						// 		<View
						// 			style={css`
						// 				flex: 1;
						// 				justify-content: space-between;
						// 				padding: 20px 20px 0px 20px;
						// 			`}
						// 		>
						// 			<View>
						// 				<Text
						// 					style={css`
						// 						font-size: 18px;
						// 						font-family: ${FONT.Pretendard.BOLD};
						// 					`}
						// 				>
						// 					🏆 무사고 기록 랭킹
						// 				</Text>
						// 				<Text
						// 					style={css`
						// 						font-size: 14px;
						// 						color: ${COLOR.GRAY.NORMAL(7)};
						// 					`}
						// 				>
						// 					전군에서 무사고 기록이 제일 오래가는 부대는?
						// 				</Text>
						// 			</View>
						// 			<View
						// 				style={css`
						// 					flex-direction: row;
						// 					justify-content: space-around;
						// 					align-items: flex-end;
						// 				`}
						// 			>
						// 				{data.accidentStreaks
						// 					.filter((_, i) => i < 3)
						// 					.map((data, idx) => (
						// 						<ChartBar
						// 							key={String(idx)}
						// 							index={idx}
						// 							color={tinycolor(COLOR.BRAND.MAIN)
						// 								.setAlpha([1, 0.75, 0.6][idx])
						// 								.toHex8String()}
						// 							data={`${data.value}일`}
						// 							label={data.name}
						// 						/>
						// 					))}
						// 			</View>
						// 		</View>
						// 	)
						case 'EMOTIONS-1':
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
											🥰 우리부대 감정통계 (1/2)
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
										emotionData={
											Object.fromEntries(
												Object.entries(emotions).slice(0, 3),
											) as EmotionData
										}
									/>
									<Spacer />
								</View>
							)
						case 'EMOTIONS-2':
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
											🥰 우리부대 감정통계 (2/2)
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
										emotionData={
											Object.fromEntries(
												Object.entries(emotions).slice(3, 6),
											) as EmotionData
										}
									/>
									<Spacer />
								</View>
							)

						// case 'ISSUES':
						// 	return (
						// 		<View
						// 			style={css`
						// 				flex: 1;
						// 				justify-content: space-between;
						// 				padding: 20px;
						// 			`}
						// 		>
						// 			<View>
						// 				<Text
						// 					style={css`
						// 						font-size: 18px;
						// 						font-family: ${FONT.Pretendard.BOLD};
						// 					`}
						// 				>
						// 					🚨 이슈 랭킹
						// 				</Text>
						// 				<Text
						// 					style={css`
						// 						font-size: 14px;
						// 						color: ${COLOR.GRAY.NORMAL(7)};
						// 					`}
						// 				>
						// 					게시판에 가장 이슈가 많은 부대는?
						// 				</Text>
						// 			</View>
						// 			<View
						// 				style={css`
						// 					flex-direction: row;
						// 				`}
						// 			>
						// 				<View
						// 					style={css`
						// 						flex: 1;
						// 					`}
						// 				>
						// 					<View
						// 						style={css`
						// 							border-radius: 4px;
						// 							background: ${COLOR.BRAND.MAIN};
						// 							padding: 2px 4px;
						// 							margin-bottom: 8px;
						// 						`}
						// 					>
						// 						<Text
						// 							style={css`
						// 								font-size: 12px;
						// 								font-family: ${FONT.Pretendard.BOLD};
						// 								color: #fff;
						// 							`}
						// 						>
						// 							이슈 최다 TOP3
						// 						</Text>
						// 					</View>
						// 					<View
						// 						style={css`
						// 							align-self: stretch;
						// 						`}
						// 					>
						// 						{data.issues.most
						// 							.filter((_, i) => i < 3)
						// 							.map((entry, idx) => (
						// 								<RankingEntry key={idx} data={entry} />
						// 							))}
						// 					</View>
						// 				</View>
						// 				<Spacer x={8} />
						// 				<View
						// 					style={css`
						// 						flex: 1;
						// 					`}
						// 				>
						// 					<View
						// 						style={css`
						// 							border-radius: 4px;
						// 							background: ${COLOR.BRAND.MAIN};
						// 							padding: 2px 4px;
						// 							margin-bottom: 8px;
						// 						`}
						// 					>
						// 						<Text
						// 							style={css`
						// 								font-size: 12px;
						// 								font-family: ${FONT.Pretendard.BOLD};
						// 								color: #fff;
						// 							`}
						// 						>
						// 							이슈 최소 TOP3
						// 						</Text>
						// 					</View>
						// 					<View
						// 						style={css`
						// 							align-self: stretch;
						// 						`}
						// 					>
						// 						{data.issues.least
						// 							.filter((_, i) => i < 3)
						// 							.map((entry, idx) => (
						// 								<RankingEntry key={idx} data={entry} />
						// 							))}
						// 					</View>
						// 				</View>
						// 			</View>
						// 			<Spacer />
						// 		</View>
						// 	)

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
		</>
	)
}

export default DataCarousel
