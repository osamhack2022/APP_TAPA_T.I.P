import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import React from 'react'
import { Animated, View } from 'react-native'
import PagerView, { PagerViewProps } from 'react-native-pager-view'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

type Props<T> = {
	data: T[]
	renderItem: (props: { item: T; index: number }) => React.ReactElement
	keyExtractor: (props: { item: T; index: number }) => string
} & Omit<PagerViewProps, 'children'>

const Carousel = <T,>({
	data,
	renderItem,
	keyExtractor,
	...props
}: Props<T>): React.ReactElement => {
	return (
		<AnimatedPagerView
			style={[
				css`
					min-height: 300px;
					flex: 1;
				`,
				props.style,
			]}
			overScrollMode="always"
			orientation="horizontal"
			{...props}
		>
			{data.map((item, index) => (
				<View
					style={css`
						padding: 0 20px;
					`}
					key={keyExtractor({
						item,
						index,
					})}
				>
					<View
						style={css`
							flex: 1;
							border-radius: 12px;
							background: ${COLOR.GRAY.NORMAL(1)};
						`}
					>
						{renderItem({
							item,
							index,
						})}
					</View>
				</View>
			))}
		</AnimatedPagerView>
	)
}

export default Carousel
