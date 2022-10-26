import PostSummary from '@components/community/PostSummary'
import PostWriteButton from '@components/community/PostWriteButton'
import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import PressableOpacity from '@components/PressableOpacity'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import { usePostListQuery } from '@hooks/data/community'
import { useNavigation } from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

const Tag: React.FC<{
	value: string
	selected: boolean
	onPress: () => void
}> = ({ value, selected, onPress }) => {
	return (
		<PressableOpacity onPress={onPress}>
			<View
				style={css`
					flex-direction: row;
					align-items: center;
					padding: 6px 10px;
					margin-right: 8px;
					border-radius: 8px;
					background: ${selected ? COLOR.BRAND.MAIN : COLOR.GRAY.NORMAL(1)};
				`}
			>
				<Text
					style={css`
						font-size: 12px;
						color: ${selected ? '#fff' : COLOR.BLACK(2)};
						margin-right: 4px;
					`}
				>
					{value}
				</Text>
				{selected && <MaterialIcons name="clear" size={12} color={'#fff'} />}
			</View>
		</PressableOpacity>
	)
}

const CommunityForumScreen: React.FC = () => {
	const [tag, setTag] = useState<string | undefined>(undefined)
	const navigation = useNavigation<NavigationProp>()
	const tags = ['부조리', '전입/전출', '군법', '성군기']
	const postListQuery = usePostListQuery(tag)
	const refetch = (force?: boolean) => {
		if (force || postListQuery.data) postListQuery.refetch()
	}
	useFocusEffect(
		useCallback(() => {
			refetch()
		}, [tag]),
	)
	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<View
				style={css`
					flex-direction: row;
					padding: 10px;
				`}
			>
				{tags.map(item => {
					return (
						<Tag
							value={item}
							key={item}
							selected={tag === item}
							onPress={() => {
								setTag(tag === item ? undefined : item)
							}}
						/>
					)
				})}
			</View>
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
