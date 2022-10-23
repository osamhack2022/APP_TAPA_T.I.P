import AsyncImage from '@components/AsyncImage'
import PressableOpacity from '@components/PressableOpacity'
import Spacer from '@components/Spacer'
import Spinner from '@components/Spinner'
import TPButton from '@components/TPButton'
import TPTextInput from '@components/TPTextInput'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import styled, { css } from '@emotion/native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import useAxios from '@hooks/axios'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { userAtom } from '@store/atoms'
import { getPublicStorageURL } from '@utils/firebase'
import {
	ImagePickerCancelledError,
	openImagePickerAsBlob,
	uploadImageBlob,
} from '@utils/image-picker'
import * as ImagePicker from 'expo-image-picker'
import { useAtomValue } from 'jotai'
import { AnimatePresence, MotiView } from 'moti'
import React, { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	LayoutAnimation,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

import { CommunityNavigationParamList } from './CommunityNavigator'
type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityWrite'
>

const formSchema = z.object({
	title: z.string(),
	content: z.string(),
	imageURL: z.string().optional(),
	tags: z.array(z.string()),
})
type FieldValues = z.infer<typeof formSchema>

const ToolbarItem = styled(PressableOpacity)`
	padding: 4px;
	margin-right: 12px;
`

const Tag: React.FC<{
	value: string
	onTapDelete: () => void
}> = ({ value, onTapDelete }) => (
	<View
		style={css`
			flex-direction: row;
			align-items: center;
			padding: 6px 10px;
			margin-right: 8px;
			border-radius: 8px;
			background: ${COLOR.GRAY.NORMAL(1)};
		`}
	>
		<Text
			style={css`
				font-size: 12px;
				color: ${COLOR.BLACK(2)};
				margin-right: 4px;
			`}
		>
			{value}
		</Text>
		<PressableOpacity onPress={onTapDelete}>
			<MaterialIcons name="clear" size={12} color={COLOR.BLACK(2)} />
		</PressableOpacity>
	</View>
)

const CommunityWriteScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const insets = useSafeAreaInsets()
	const [imageUploading, setImageUploading] = useState(false)
	const axios = useAxios()
	const user = useAtomValue(userAtom)

	const {
		control,
		handleSubmit,
		formState: { isValid, errors },
		...form
	} = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			tags: [],
		},
	})

	const onSubmit = useCallback<SubmitHandler<FieldValues>>(
		async ({ title, tags, content, imageURL }) => {
			console.log({ title, tags: tags.join(','), content, imageURL })
			const res = await axios.post(
				'/community/posts/',
				{
					title: title,
					tags: tags.join(','),
					content: content,
					pic_url: imageURL,
				},
				{
					headers: { 'Content-Type': `multipart/form-data` },
				},
			)
			navigation.pop()
		},
		[],
	)

	useFocusEffect(
		useCallback(() => {
			navigation.setOptions({
				headerRightContainerStyle: {
					paddingRight: 12,
				},
				headerRight: props => {
					return (
						<TPButton
							variant="inline"
							disabled={!isValid}
							onPress={handleSubmit(onSubmit)}
						>
							등록
						</TPButton>
					)
				},
			})
		}, [isValid, handleSubmit, onSubmit]),
	)

	const imageURL = form.watch('imageURL')
	const tags = form.watch('tags')

	const openImagePicker = useCallback(async () => {
		try {
			const imageBlob = await openImagePickerAsBlob({
				allowsMultipleSelection: false,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 0,
			})
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
			setImageUploading(true)
			const uploadResult = await uploadImageBlob(imageBlob, '/community')
			const url = getPublicStorageURL(uploadResult.ref)
			form.setValue('imageURL', url, {
				shouldValidate: true,
			})
		} catch (error) {
			console.error(error)
			if (!(error instanceof ImagePickerCancelledError)) {
				Alert.alert(JSON.stringify(error))
			}
		} finally {
			setImageUploading(false)
		}
	}, [])

	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<KeyboardAvoidingView
				behavior="padding"
				style={css`
					flex: 1;
				`}
			>
				<Controller
					control={control}
					name="title"
					render={({ field: { onBlur, onChange, value } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder="제목을 입력해주세요"
							style={css`
								padding: 16px 12px;
								font-size: 16px;
								border-bottom-color: ${COLOR.GRAY.NORMAL(2)};
								border-bottom-width: 1px;
								font-family: ${FONT.Pretendard.BOLD};
							`}
							placeholderTextColor={COLOR.GRAY.NORMAL(6)}
						/>
					)}
				/>

				<View
					style={css`
						border-bottom-color: ${COLOR.GRAY.NORMAL(2)};
						border-bottom-width: 1px;
					`}
				>
					<View
						style={css`
							padding: 0 12px;
							padding-top: 16px;
							flex-direction: row;
							align-items: center;
						`}
					>
						<FontAwesome5
							name="tags"
							size={20}
							color={
								form.watch('tags')?.length
									? COLOR.BRAND.MAIN
									: COLOR.GRAY.NORMAL(7)
							}
						/>
						<Spacer x={12} />
						<TPTextInput
							returnKeyType="done"
							returnKeyLabel="추가"
							placeholder="태그를 입력해주세요"
							containerStyle={css`
								flex: 1;
							`}
							style={css`
								font-size: 14px;
								padding: 8px;
								border-radius: 8px;
							`}
							onSubmitEditing={event => {
								const value = event.nativeEvent.text
								if (!value) return
								LayoutAnimation.configureNext(
									LayoutAnimation.Presets.easeInEaseOut,
								)
								form.setValue('tags', Array.from(new Set([value, ...tags])), {
									shouldValidate: true,
								})
							}}
							clearOnSubmit
							clearTextOnFocus
							blurOnSubmit={false}
						/>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
					>
						<View
							style={css`
								padding: 8px;
								flex-direction: row;
							`}
						>
							{tags.map(tag => (
								<Tag
									value={tag}
									key={tag}
									onTapDelete={() => {
										LayoutAnimation.configureNext(
											LayoutAnimation.Presets.easeInEaseOut,
										)
										form.setValue(
											'tags',
											form.getValues('tags').filter(t => t !== tag),
											{ shouldValidate: true },
										)
									}}
								/>
							))}
						</View>
					</ScrollView>
				</View>
				{(imageURL || imageUploading) && (
					<View
						style={css`
							position: relative;
							min-height: 48px;
							border-bottom-color: ${COLOR.GRAY.NORMAL(2)};
							border-bottom-width: 1px;
						`}
					>
						<AnimatePresence>
							{imageUploading && (
								<View
									style={css`
										position: absolute;
										z-index: 1;
										width: 100%;
										height: 100%;
										background: #11111177;
										align-items: center;
										justify-content: center;
									`}
								>
									<Spinner />
								</View>
							)}
						</AnimatePresence>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							alwaysBounceHorizontal
							style={css`
								flex-direction: row;
								padding: 8px 0;
							`}
							contentInset={{
								left: 12,
								right: 24,
							}}
						>
							<AnimatePresence presenceAffectsLayout>
								<MotiView
									from={{ scale: 0.3, opacity: 0.3 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{
										scale: 0.3,
										opacity: 0,
									}}
									key={imageURL}
									style={css`
										position: relative;
										margin-right: 8px;
									`}
								>
									<PressableOpacity
										style={css`
											position: absolute;
											z-index: 1;
											width: 20px;
											height: 20px;
											top: 4px;
											right: 4px;
											border-radius: 10px;
											background: #fff;
											justify-content: center;
											align-items: center;
										`}
										onPress={() => {
											Alert.alert('사진 삭제', '정말로 사진을 삭제할까요?', [
												{
													text: '네, 삭제할래요',
													style: 'destructive',
													onPress: () => {
														LayoutAnimation.configureNext(
															LayoutAnimation.Presets.easeInEaseOut,
														)
														form.setValue('imageURL', undefined, {
															shouldValidate: true,
														})
													},
												},
												{
													text: '아니요!',
													style: 'default',
												},
											])
										}}
									>
										<MaterialIcons
											name="clear"
											size={12}
											color={COLOR.BLACK(4)}
										/>
									</PressableOpacity>
									<AsyncImage
										style={css`
											width: 96px;
											height: 96px;
											border-radius: 12px;
											overflow: hidden;
										`}
										source={{
											uri: imageURL,
										}}
									/>
								</MotiView>
							</AnimatePresence>
						</ScrollView>
					</View>
				)}
				<Controller
					control={control}
					name="content"
					render={({ field: { onBlur, onChange, value } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder="내용을 입력해주세요"
							textAlignVertical="top"
							multiline
							style={css`
								flex: 1;
								padding: 14px;
								font-size: 14px;
							`}
							placeholderTextColor={COLOR.GRAY.NORMAL(6)}
						/>
					)}
				/>
			</KeyboardAvoidingView>
			<KeyboardAccessoryView
				alwaysVisible
				style={css`
					background: #fff;
				`}
			>
				{({ isKeyboardVisible }) => (
					<View
						style={css`
							padding: 2px 12px;
							padding-bottom: ${(isKeyboardVisible ? 8 : insets.bottom) + 'px'};
						`}
					>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							alwaysBounceVertical={false}
							keyboardShouldPersistTaps="handled"
						>
							<View
								style={css`
									flex-direction: row;
								`}
							>
								<ToolbarItem onPress={() => Keyboard.dismiss()}>
									<MaterialIcons
										name="keyboard-hide"
										size={24}
										color={COLOR.GRAY.NORMAL(7)}
									/>
								</ToolbarItem>
								<ToolbarItem onPress={openImagePicker}>
									<FontAwesome5
										name="image"
										size={24}
										color={COLOR.BRAND.MAIN}
									/>
								</ToolbarItem>
							</View>
						</ScrollView>
					</View>
				)}
			</KeyboardAccessoryView>
		</View>
	)
}

export default CommunityWriteScreen
