import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

type Props = {
	name: string
	label: string
}

const ConsultIconButton: React.FC<Props> = ({ name, label, ...passProps }) => {
	return (
		<Pressable {...passProps}>
			<View
				style={css`
					align-items: center;
					width: 40px;
				`}
			>
				<View
					style={css`
						width: 30px;
						height: 30px;
						border-radius: 15px;
						background-color: ${COLOR.BRAND.MAIN};
						justify-content: center;
						align-items: center;
					`}
				>
					<FontAwesome5 name={name} size={16} color={'#fff'} />
				</View>
				<Spacer y={7} />
				<Text
					style={css`
            font-family: ${FONT.Pretendard.BOLD}
            font-size: 12px;
          `}
				>
					{label}
				</Text>
			</View>
		</Pressable>
	)
}

export default ConsultIconButton
