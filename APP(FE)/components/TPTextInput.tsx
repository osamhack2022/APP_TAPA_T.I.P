import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import styled, { css } from '@emotion/native'
import { useMemo, useRef, useState } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'

import TPNote from './TPNote'

type Props<T = string> = Omit<TextInputProps, 'value'> & {
	label?: string
	helper?: string
	error?: string | string[]

	// how it's saved in state
	serialize?: (input?: string) => T | undefined
	// how it's displayed in text
	deserialize?: (input?: T) => string | undefined

	value?: T
	onChangeValue?: (value?: T) => void
}

const TPTextInput = <T extends any = string>({
	value: propValue,
	label,
	helper,
	error,
	serialize,
	deserialize,
	onChangeValue,
	onChangeText,
	...passProps
}: Props<T>): React.ReactElement => {
	const inputRef = useRef<TextInput>(null)
	const [value, setValue] = useState(propValue)
	const [focused, setFocused] = useState(false)

	const [backgroundColor, foregroundColor, borderColor, labelColor] =
		useMemo(() => {
			if (focused) {
				return ['#fff', COLOR.BLACK(3), COLOR.GRAY.NORMAL(1), COLOR.BRAND.MAIN]
			}
			if (value) {
				return [
					COLOR.GRAY.NORMAL(1),
					COLOR.BLACK(3),
					COLOR.GRAY.NORMAL(1),
					COLOR.BRAND.MAIN,
				]
			}
			return [
				COLOR.GRAY.NORMAL(1),
				COLOR.BLACK(3),
				COLOR.GRAY.NORMAL(1),
				COLOR.GRAY.NORMAL(6),
			]
		}, [value, focused, error?.length])

	return (
		<View>
			{label && (
				<Text
					style={css`
						font-family: ${FONT.Pretendard.BOLD};
						color: ${labelColor};
						margin-left: 8px;
						margin-bottom: 4px;
					`}
				>
					{label}
				</Text>
			)}
			<StyledTextInput
				ref={inputRef}
				{...passProps}
				value={deserialize?.(value) ?? (value as string)}
				onChangeText={text => {
					onChangeText?.(text)
					const newValue = serialize?.(text) ?? text
					setValue(newValue as T)
					onChangeValue?.(newValue as T)
				}}
				onBlur={e => {
					setFocused(false)
					passProps.onBlur?.(e)
				}}
				onFocus={e => {
					setFocused(true)
					passProps.onFocus?.(e)
				}}
				style={[
					css`
						color: ${foregroundColor};
						background-color: ${backgroundColor};
						border-color: ${borderColor};
					`,
					passProps.style,
				]}
				placeholderTextColor={COLOR.GRAY.NORMAL(5)}
			/>
			{helper && (
				<Text
					style={css`
						color: ${COLOR.GRAY.NORMAL(5)};
						margin-top: 4px;
						margin-left: 8px;
						font-size: 12px;
					`}
				>
					{helper}
				</Text>
			)}
			{typeof error === 'string' ? (
				<TPNote
					style={css`
						margin-top: 8px;
					`}
					type="error"
					title={error}
				/>
			) : typeof error === 'object' && Array.isArray(error) ? (
				error.map(e => (
					<TPNote
						style={css`
							margin-top: 8px;
						`}
						type="error"
						title={e}
						key={e}
					/>
				))
			) : null}
		</View>
	)
}

const StyledTextInput = styled.TextInput`
	padding: 12px;
	border-radius: 12px;
	border-width: 2px;
	font-size: 16px;
`

export default TPTextInput
