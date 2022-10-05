import styled, { css } from '@emotion/native'
import { useMemo, useState } from 'react'
import {
	Pressable,
	StyleProp,
	Text,
	useWindowDimensions,
	View,
	ViewStyle,
} from 'react-native'
import Modal from 'react-native-modal'

import { FONT } from '@/constants/font'

export type ModalChildProps<T> = {
	value?: T
	setValue: (value?: T) => void
	cancel: () => void
}

type Props<T> = {
	label?: string
	placeholder?: string

	value?: T

	onChange?: (value?: T) => void
	onCancel?: () => void

	children: (props: ModalChildProps<T>) => React.ReactElement
	renderValue: (value?: T) => string | undefined | React.ReactElement

	modalStyle?: StyleProp<ViewStyle>
}

const TPModalInput = <T,>({
	label,
	placeholder,
	onChange,
	onCancel,
	children,
	renderValue,
	modalStyle,
	...props
}: Props<T>): React.ReactElement => {
	const dimensions = useWindowDimensions()
	const [value, setValue] = useState(props.value)
	const [open, setOpen] = useState(false)

	const renderedValue = useMemo(() => renderValue(value), [renderValue, value])

	return (
		<>
			<View>
				{label && (
					<Text
						style={css`
							font-family: ${FONT.Pretendard.BOLD};
							color: ${value ? '#0059ff' : '#888'};
							margin-left: 8px;
							margin-bottom: 4px;
						`}
					>
						{label}
					</Text>
				)}
				<Pressable
					onPress={() => setOpen(true)}
					style={({ pressed }) =>
						pressed &&
						css`
							opacity: 0.7;
						`
					}
				>
					<TextInputLikeView>
						{typeof renderedValue === 'string' && (
							<Text
								style={css`
									color: #444;
									font-size: 16px;
								`}
							>
								{renderedValue}
							</Text>
						)}
						{typeof renderedValue === 'undefined' && (
							<Text
								style={css`
									color: #aaa;
									font-size: 16px;
								`}
							>
								{placeholder}
							</Text>
						)}
						{typeof renderedValue === 'object' && renderedValue}
					</TextInputLikeView>
				</Pressable>
			</View>
			<Modal
				isVisible={open}
				onBackdropPress={() => {
					setOpen(false)
					onCancel?.()
				}}
			>
				<View
					style={[
						css`
							flex: 1;
							background: #fff;
							padding: 16px;
							border-radius: 12px;
						`,
						{
							maxHeight: dimensions.height - 200,
						},
						modalStyle,
					]}
				>
					{children({
						value,
						setValue: v => {
							setValue(v)
							setOpen(false)
						},
						cancel: () => {
							setOpen(false)
							onCancel?.()
						},
					})}
				</View>
			</Modal>
		</>
	)
}

const TextInputLikeView = styled.View`
	padding: 12px;
	border-radius: 12px;
	border-width: 2px;

	background-color: #e8e8e8;
	border-color: #e8e8e8;
`

export default TPModalInput
