import useAxios from '@hooks/axios'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type CommunityEmotionRouteProp = RouteProp<
	CommunityNavigationParamList,
	'CommunityEmotion'
>

const CommunityEmotionScreen: React.FC = () => {
	const {
		params: { post },
	} = useRoute<CommunityEmotionRouteProp>()
	const axios = useAxios()
	const dataQuery = useQuery(['tapa', 'postEmotion'], async () => {
		const res = await axios.post('/classify/', {
			content: post.content,
		})
		const { avg_scores, emotion, overall_score } = res.data
		return { avg_scores, emotion, overall_score }
	})
	return <View>{/* <EmotionPanel emotionData={} /> */}</View>
}

export default CommunityEmotionScreen
