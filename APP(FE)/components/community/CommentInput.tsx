import TPTextInput from '@components/TPTextInput'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import useAxios from '@hooks/axios'
import React, { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

type Props = {
	isKeyboardVisible: boolean
	postId: string
}

const formSchema = z.object({
	content: z.string().min(1).max(100),
})

type FieldValues = z.infer<typeof formSchema>

const CommentInput: React.FC<Props> = ({ isKeyboardVisible, postId }) => {
	const insets = useSafeAreaInsets()
	const axios = useAxios()
	const {
		control,
		handleSubmit,
		formState: { isValid, isSubmitting },
		...form
	} = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			content: '',
		},
	})

	const content = form.watch('content')

	const onSubmit = useCallback<SubmitHandler<FieldValues>>(
		async ({ content }) => {
			const res = await axios.post(`/community/comment/${postId}`, {
				content,
			})
			console.log(res)
		},
		[],
	)

	return (
		<View
			style={css`
				padding: 0px 20px;
				height: 54px;
				padding-bottom: ${(isKeyboardVisible ? 8 : insets.bottom) + 'px'};
				flex-direction: row;
				align-items: center;
			`}
		>
			<Controller
				control={control}
				name="content"
				render={({ field }) => (
					<TPTextInput
						value={field.value}
						onBlur={field.onBlur}
						onChangeText={field.onChange}
						returnKeyType="done"
						returnKeyLabel="추가"
						placeholder="댓글을 입력하세요"
						containerStyle={css`
							flex: 1;
						`}
						clearOnSubmit
						onSubmitEditing={handleSubmit(onSubmit)}
						style={css`
							font-size: 14px;
							padding: 8px;
							border-radius: 8px;
						`}
						clearTextOnFocus
						blurOnSubmit={false}
					/>
				)}
			/>
			<Pressable
				disabled={!isValid}
				style={css`
					padding: 0px 10px;
				`}
				onPress={handleSubmit(onSubmit)}
			>
				<FontAwesome5
					name="paper-plane"
					size={16}
					solid
					color={COLOR.GRAY.NORMAL(6)}
				/>
			</Pressable>
		</View>
	)
}

export default CommentInput
