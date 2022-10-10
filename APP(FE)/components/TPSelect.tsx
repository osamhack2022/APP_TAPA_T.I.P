import { COLOR } from '@constants/color'
import styled, { css } from '@emotion/native'
import { useState } from 'react'
import { FlatList, FlatListProps, Pressable, Text, View } from 'react-native'

import Spacer from './Spacer'

export type TPSelectProps<T = string> = {
	value?: T
	onChange?: (value: T) => void

	keyExtractor: (value: T) => string
	options: T[]
	renderOption: (value: T) => string

	flatlistProps?: Partial<FlatListProps<T>>
	style?: FlatListProps<T>['style']
}

const TPSelect = <T extends any = string>({
	onChange,
	keyExtractor,
	options,
	renderOption,
	flatlistProps,
	style,
	...props
}: TPSelectProps<T>): React.ReactElement => {
	const [value, setValue] = useState(props.value)
	return (
		<FlatList<T>
			{...(flatlistProps ?? {})}
			style={style}
			data={options}
			keyExtractor={item => keyExtractor(item)}
			renderItem={({ index, item }) => (
				<Pressable
					key={keyExtractor(item)}
					onPress={() => {
						setValue(item)
						onChange?.(item)
					}}
					style={({ pressed }) => [
						css`
							border-radius: 12px;
							background: ${pressed ? '#ededed' : '#fff'};
						`,
					]}
				>
					<View
						style={css`
							flex-direction: row;
							align-items: center;
							padding: 12px;
						`}
					>
						<SelectionCircle selected={item === value} />
						<Spacer x={8} />
						<Text
							style={css`
								color: ${COLOR.BLACK(3)};
								font-size: 16px;
							`}
						>
							{renderOption(item)}
						</Text>
					</View>
				</Pressable>
			)}
		/>
	)
}

const SelectionCircle = styled.View<{ selected?: boolean }>`
	width: 20px;
	height: 20px;
	border-radius: 12px;
	border-width: 2px;
	border-color: ${({ selected }) =>
		selected ? COLOR.BRAND.MAIN : COLOR.GRAY.NORMAL(4)};
	background: ${({ selected }) => (selected ? COLOR.BRAND.MAIN : '#FFF')};
`

export default TPSelect
