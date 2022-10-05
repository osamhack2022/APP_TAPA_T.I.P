import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommunityNaviParamList } from '@screens/tab/community/CommunityNavigator'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { PostType } from '@/lib/types/community'

type NavigationProp = StackNavigationProp<
	CommunityNaviParamList,
	'CommunityHome'
>

type Props = {
	post: PostType
}
const HomePostListItem: React.FC<React.PropsWithChildren<Props>> = ({
	post,
}) => {
	const navigation = useNavigation<NavigationProp>()
	const onPressNavigate = () => {
		navigation.navigate('CommunityPost', { postId: post.id })
	}
	return (
		<TouchableOpacity onPress={onPressNavigate}>
			<View>
				<Text>{post.title}</Text>
				<View
					style={css`
						padding-top: 5px;
						align-self: flex-end;
						flex-direction: row;
					`}
				>
					<Entypo name="eye" />
					<Text>{post.views}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default HomePostListItem
