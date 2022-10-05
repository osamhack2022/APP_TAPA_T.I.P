import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommunityNavigationParamList } from '@screens/tab/community/CommunityNavigator'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { PostType } from '@/types/community'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

type Props = {
	post: PostType
}
const HomePostListItem: React.FC<React.PropsWithChildren<Props>> = ({
	post,
}) => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<Pressable
			onPress={() => navigation.navigate('CommunityPost', { postId: post.id })}
		>
			<View>
				<Text>{post.title}</Text>
				<View
					style={css`
						padding-top: 4px;
						align-self: flex-end;
						flex-direction: row;
					`}
				>
					<Entypo name="eye" />
					<Text>{post.views}</Text>
				</View>
			</View>
		</Pressable>
	)
}

export default HomePostListItem
