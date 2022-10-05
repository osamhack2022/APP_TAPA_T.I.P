import type { ModalChildProps } from '@components/TPModalInput'
import TPModalInput from '@components/TPModalInput'
import TPSelect from '@components/TPSelect'
import { css } from '@emotion/native'
import { useState } from 'react'
import { FlatListProps, StyleProp, View, ViewStyle } from 'react-native'

import Spacer from './Spacer'
import TPButton from './TPButton'

type Props<T = string> = {
	label?: string
	placeholder?: string

	value?: T
	keyExtractor: (value: T) => string
	options: T[]

	onChange?: (value?: T) => void
	onCancel?: () => void

	renderOption: (value: T) => string
	renderValue: (value?: T) => string | undefined | React.ReactElement

	modalStyle?: StyleProp<ViewStyle>
	flatlistProps?: Partial<FlatListProps<T>>
}

const TPModalSelectContent = <T extends any = string>({
	flatlistProps,
	keyExtractor,
	options,
	renderOption,
	...props
}: ModalChildProps<T> &
	Pick<
		Props<T>,
		'keyExtractor' | 'options' | 'renderOption' | 'flatlistProps'
	>) => {
	const [value, setValue] = useState(props.value)
	console.log(value)

	return (
		<View style={{ flex: 1 }}>
			<TPSelect<T>
				flatlistProps={{
					showsVerticalScrollIndicator: false,
					contentInset: {
						top: 0,
						left: 0,
						right: 0,
						bottom: 12,
					},
					...flatlistProps,
				}}
				options={options}
				keyExtractor={keyExtractor}
				renderOption={renderOption}
				style={{
					padding: 12,
				}}
				value={value}
				onChange={v => setValue(v)}
			/>
			<View
				style={css`
					flex-direction: row;
					align-items: center;
					padding: 0 12px 24px 12px;
				`}
			>
				<TPButton
					style={{ flex: 1 }}
					variant="secondary"
					onPress={() => props.cancel()}
				>
					취소
				</TPButton>
				<Spacer x={8} />
				<TPButton style={{ flex: 1 }} onPress={() => props.setValue(value)}>
					선택
				</TPButton>
			</View>
		</View>
	)
}

const TPModalSelect = <T extends any = string>({
	keyExtractor,
	options,
	renderOption,
	flatlistProps,
	...props
}: Props<T>): React.ReactElement => {
	const childPassProps = { keyExtractor, options, renderOption, flatlistProps }
	return (
		<TPModalInput<T>
			{...props}
			modalStyle={css`
				padding: 0;
			`}
		>
			{childProps => (
				<TPModalSelectContent<T> {...childProps} {...childPassProps} />
			)}
		</TPModalInput>
	)
}

export default TPModalSelect
