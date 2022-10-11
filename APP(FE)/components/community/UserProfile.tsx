import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

type Props = {
	userName: string
	imageUrl?: string
	size: 'small' | 'large'
}
const UserProfile: React.FC<Props> = ({ userName, imageUrl, size }) => {
	const imageSize: number = size === 'small' ? 16 : 32
	return (
		<View
			style={css`
				flex-direction: row;
				align-items: center;
			`}
		>
			{imageUrl ? (
				<Image
					source={{ uri: imageUrl }}
					style={{
						width: imageSize,
						height: imageSize,
						borderRadius: 2,
					}}
				/>
			) : (
				<View
					style={css`
						width: ${imageSize + 'px'};
						height: ${imageSize + 'px'};
						border-radius: ${size === 'small' ? '2px' : '5px'};
						background-color: ${COLOR.GRAY.NORMAL(7)};
						justify-content: center;
						align-items: center;
					`}
				>
					<FontAwesome5
						name="user"
						size={size === 'small' ? 10 : 19}
						color={'#fff'}
						solid
					/>
				</View>
			)}
			<Spacer x={size === 'small' ? 6 : 14} />
			<View>
				<Text
					style={css`
						font-size: ${size === 'small' ? '12px' : '14px'};
					`}
				>
					{userName}
				</Text>
				{size === 'large' && (
					<Text
						style={css`
							font-size: 12px;
						`}
					>
						소속 비공개
					</Text>
				)}
			</View>
		</View>
	)
}
export default UserProfile
