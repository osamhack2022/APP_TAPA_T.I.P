import PostSummary from '@components/community/PostSummary'
import PostWriteButton from '@components/community/PostWriteButton'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { usePostListQuery } from '@hooks/data/community'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

const CommunityForumScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()

	const postListQuery = usePostListQuery()

	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<PostWriteButton />
			<ScrollView
				contentInset={{
					bottom: 24,
				}}
			>
				{!postListQuery.isLoading && postListQuery.data ? (
					postListQuery.data.map(item => {
						return <PostSummary post={item} size="default" key={item.id} />
					})
				) : (
					<View
						style={css`
							align-items: center;
						`}
					>
						<FadingDots />
					</View>
				)}
				<FocusAwareStatusBar style="dark" />
			</ScrollView>
		</View>
	)
}

export default CommunityForumScreen
