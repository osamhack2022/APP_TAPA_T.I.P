import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
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
							color: ${value ? COLOR.BRAND.MAIN : COLOR.GRAY.NORMAL(6)};
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
									color: ${COLOR.GRAY.NORMAL(7)};
									font-size: 16px;
								`}
							>
								{renderedValue}
							</Text>
						)}
						{typeof renderedValue === 'undefined' && (
							<Text
								style={css`
									color: ${COLOR.GRAY.NORMAL(5)};
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
							setOpen(false)
							setValue(v)
							onChange?.(v)
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

	background-color: ${COLOR.GRAY.NORMAL(1)};
	border-color: ${COLOR.GRAY.NORMAL(1)};
`

export default TPModalInput
