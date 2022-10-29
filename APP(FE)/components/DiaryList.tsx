import Spinner from '@components/Spinner'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { FontAwesome5, Fontisto } from '@expo/vector-icons'
import useAxios from '@hooks/axios'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'

import AnimatedProgressBar from './AnimatedProgressBar'
import { EMOTION_COLORS, EMOTION_LABEL, EmotionKey } from './EmotionPanel'

const DiaryList: React.FC<{ limit?: number }> = ({ limit }) => {
	const firebaseUser = useAtomValue(userAtom)
	const axios = useAxios()

	const [selectedDiary, setSelectedDiary] = useState<string>()

	const emotionQuery = useQuery<{
		top_emotion: EmotionKey
		weighted_emotion_score: number
	}>(
		['tapa', '/diary/emotion', selectedDiary],
		async ({ queryKey }) => {
			if (!queryKey[2]) {
				return {}
			}
			const res = await axios.get(`/diary/emotion/${queryKey[2]}`)
			if (Array.isArray(res)) {
				throw new Error('Invalid Data')
			}
			const data = Object.values(res.data)[0]
			return data as any
		},
		{
			enabled: !!selectedDiary,
		},
	)

	const diaryListQuery = useQuery<
		{
			key: string
			content: string
			created_at: number
		}[]
	>(
		['tapa', '/diary/list'],
		async () => {
			const res = await axios.get('/diary/list')
			return res.data
		},
		{
			enabled: !!firebaseUser,
			refetchOnMount: true,
		},
	)

	const refetch = (force?: boolean) => {
		if (force || diaryListQuery.data) diaryListQuery.refetch()
	}

	useFocusEffect(
		useCallback(() => {
			refetch()
		}, []),
	)

	if (diaryListQuery.isLoading || !diaryListQuery.data)
		return (
			<View
				style={css`
					padding: 20px 0px;
					align-items: center;
					justify-content: center;
				`}
			>
				<Spinner />
			</View>
		)
	return (
		<>
			<View>
				{diaryListQuery.data
					.filter((_, idx) => !limit || limit > idx)
					.map(entry => (
						<View
							key={entry.key}
							style={css`
								margin-bottom: 4px;
								padding: 8px;
								border-radius: 8px;
								background: ${COLOR.GRAY.NORMAL(1)};

								flex-direction: row;
								align-items: center;
								justify-content: space-between;
							`}
						>
							<View
								style={css`
									flex: 1;
								`}
							>
								<Text
									style={css`
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									{DateTime.fromMillis(entry.created_at * 1000).toFormat(
										'MM.dd.',
									)}
								</Text>
								<Text>{entry.content}</Text>
							</View>

							<View
								style={css`
									margin-left: 16px;
									margin-right: 4px;
								`}
							>
								<TouchableOpacity
									onPress={() => {
										setSelectedDiary(entry.key)
									}}
								>
									<Fontisto
										name="heartbeat"
										size={24}
										color={COLOR.BRAND.MAIN}
									/>
								</TouchableOpacity>
							</View>
						</View>
					))}
			</View>

			<Modal
				isVisible={!!selectedDiary}
				onBackdropPress={() => {
					setSelectedDiary(undefined)
				}}
			>
				<View
					style={[
						css`
							background: #fff;
							padding: 16px;
							border-radius: 12px;
						`,
					]}
				>
					<>
						{(emotionQuery.isFetching || emotionQuery.isRefetching) && (
							<View
								style={css`
									justify-content: center;
									align-items: center;
								`}
							>
								<Spinner />
							</View>
						)}
						{emotionQuery.error && (
							<Text>감정 데이터를 불러오지 못했어요!</Text>
						)}
						{emotionQuery.data && (
							<View>
								<Text
									style={css`
										font-size: 24px;
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									감정 데이터 분석 결과
								</Text>
								<View
									style={css`
										margin-top: 12px;
										flex-direction: row;
										align-items: center;
										justify-content: space-between;
									`}
								>
									<Text
										style={css`
											font-size: 24px;
											font-family: ${FONT.Pretendard.BOLD};
											color: ${EMOTION_COLORS[emotionQuery.data.top_emotion]};
										`}
									>
										{EMOTION_LABEL[emotionQuery.data.top_emotion]}
									</Text>

									<Text
										style={css`
											font-size: 24px;
											font-family: ${FONT.Pretendard.BOLD};
										`}
									>
										{(
											Math.abs(emotionQuery.data.weighted_emotion_score) * 100
										).toFixed(2)}
										%
									</Text>
								</View>
								<AnimatedProgressBar
									color={EMOTION_COLORS[emotionQuery.data.top_emotion]}
									value={Math.abs(emotionQuery.data.weighted_emotion_score)}
								/>
								<View
									style={css`
										margin-top: 12px;
										flex-direction: row;
										align-items: center;
										justify-content: flex-end;
									`}
								>
									<FontAwesome5
										name="question-circle"
										size={12}
										color={COLOR.GRAY.NORMAL(5)}
									/>
									<Text
										style={css`
											margin-left: 4px;
											color: ${COLOR.GRAY.NORMAL(5)};
										`}
									>
										AI가 분석한 해당 글에 담긴 감정이에요
									</Text>
								</View>
							</View>
						)}
					</>
				</View>
			</Modal>
		</>
	)
}

export default DiaryList
