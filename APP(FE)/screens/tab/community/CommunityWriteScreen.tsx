import TPTextInput from '@components/TPTextInput'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import React from 'react'
import { KeyboardAvoidingView, ScrollView, TextInput, View } from 'react-native'

const CommunityWriteScreen: React.FC = () => {
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
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default CommunityWriteScreen
