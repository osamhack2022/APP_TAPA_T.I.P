import PostWriteTabBar from '@components/community/PostWriteTabBar'
import TPTextInput from '@components/TPTextInput'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { atom, useAtom } from 'jotai'
import React from 'react'
import {
	Image,
	KeyboardAvoidingView,
	ScrollView,
	TextInput,
	View,
} from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityWrite'
>

const imageUrlAtom = atom<string>('')

const CommunityWriteScreen: React.FC = () => {
	const [imageUrl, setImageUrl] = useAtom(imageUrlAtom)

	const navigation = useNavigation<NavigationProp>()
	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={72}
			enabled
			style={css`
				flex: 1;
			`}
		>
			<ScrollView
				contentInset={{
					bottom: 24,
				}}
			>
				<View
					style={css`
						padding: 10px 20px;
					`}
				>
					<TextInput
						placeholder="제목을 입력해주세요"
						style={{
							height: 44,
							fontSize: 16,
							borderBottomWidth: 1,
							borderBottomColor: COLOR.GRAY.NORMAL(4),
						}}
						placeholderTextColor={COLOR.GRAY.NORMAL(6)}
					/>
					{imageUrl && (
						<Image source={{ uri: imageUrl }} style={{ width: '100%' }} />
					)}
					<TextInput
						placeholder="내용을 입력해주세요"
						textAlignVertical="top"
						multiline
						style={{
							height: 550,
							paddingTop: 10,
							fontSize: 14,
							borderBottomWidth: 1,
							borderBottomColor: COLOR.GRAY.NORMAL(4),
						}}
						placeholderTextColor={COLOR.GRAY.NORMAL(6)}
					/>
					<TPTextInput
						placeholder="태그를 입력해주세요"
						style={{ marginTop: 10 }}
					/>
				</View>
				<PostWriteTabBar imageUrl={imageUrl} setImageUrl={setImageUrl} />
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default CommunityWriteScreen
