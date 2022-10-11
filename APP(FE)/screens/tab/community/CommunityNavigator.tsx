import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Entypo } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import CommunityForumScreen from './CommunityForumScreen'
import CommunityHomeScreen from './CommunityHomeScreen'
import CommunityPostScreen from './CommunityPostScreen'
import CommunityWriteScreen from './CommunityWriteScreen'

export type CommunityNavigationParamList = {
	CommunityHome: undefined
	CommunityForum: undefined
	CommunityPost: { postId: number }
	CommunityWrite: undefined
}

const Stack = createStackNavigator<CommunityNavigationParamList>()

const CommunityNavigator: React.FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				headerBackTitleVisible: false,
				headerBackImage: () => (
					<Entypo
						name="chevron-left"
						size={24}
						style={css`
							padding: 10px;
						`}
					/>
				),
				headerTitleStyle: {
					fontFamily: FONT.Pretendard.BOLD,
				},
			}}
		>
			<Stack.Screen
				name="CommunityHome"
				component={CommunityHomeScreen}
				options={{ title: '커뮤니티' }}
			/>
			<Stack.Screen
				name="CommunityForum"
				component={CommunityForumScreen}
				options={{ title: '자유게시판' }}
			/>
			<Stack.Screen
				name="CommunityPost"
				component={CommunityPostScreen}
				options={{ title: '자유게시판' }}
			/>
			<Stack.Screen
				name="CommunityWrite"
				component={CommunityWriteScreen}
				options={{
					title: '글 작성',
					presentation: 'modal',
					headerBackImage: () => (
						<Entypo
							name="cross"
							size={24}
							style={css`
								padding: 10px;
							`}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	)
}

export default CommunityNavigator
