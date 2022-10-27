import Spinner from '@components/Spinner'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import React, { useCallback } from 'react'
import { Text, View } from 'react-native'

const DiaryList: React.FC<{ limit?: number }> = ({ limit }) => {
	const firebaseUser = useAtomValue(userAtom)
	const axios = useAxios()

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
						`}
					>
						<Text
							style={css`
								font-family: ${FONT.Pretendard.BOLD};
							`}
						>
							{DateTime.fromMillis(entry.created_at * 1000).toFormat('MM.dd.')}
						</Text>
						<Text>{entry.content}</Text>
					</View>
				))}
		</View>
	)
}

export default DiaryList
