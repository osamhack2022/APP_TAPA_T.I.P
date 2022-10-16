import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { useState } from 'react'
import { Image, ImageProps, StyleProp, View, ViewStyle } from 'react-native'

import Spinner from './Spinner'

type Props = Omit<ImageProps, 'style'> & {
	style?: StyleProp<ViewStyle>
}

const AsyncImage: React.FC<Props> = ({ style, ...props }) => {
	const [loading, setLoading] = useState(true)

	return (
		<View
			style={[
				css`
					position: relative;
				`,
				style,
			]}
		>
			{loading && (
				<View
					style={css`
						background: ${COLOR.GRAY.NORMAL(1)};
						position: absolute;
						z-index: 1;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						align-items: center;
						justify-content: center;
					`}
				>
					<Spinner />
				</View>
			)}
			<Image
				{...props}
				onLoadStart={() => setLoading(true)}
				onLoad={() => setLoading(false)}
				style={
					css`
						background: ${COLOR.GRAY.NORMAL(1)};
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					` as ImageProps['style']
				}
			/>
		</View>
	)
}

export default AsyncImage
