import Spacer from '@components/Spacer'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Pressable, View } from 'react-native'

type Props = {
	imageUrl: string
	setImageUrl: (url: string) => void
}
const PostWriteTabBar: React.FC<Props> = ({ imageUrl, setImageUrl }) => {
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		})
		if (!result.cancelled) {
			setImageUrl(result.uri)
		}
	}

	return (
		<View
			style={css`
				width: 100%;
				height: 52px;
				flex-direction: row;
				padding: 12px 20px;
				align-items: center;
			`}
		>
			<Pressable onPress={pickImage}>
				<FontAwesome5 name="image" size={25} />
			</Pressable>
			<Spacer x={20} />
			<Pressable>
				<FontAwesome5 name="video" size={25} />
			</Pressable>
		</View>
	)
}

export default PostWriteTabBar
