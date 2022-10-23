import { ConsultantType } from '@app-types/consult'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ConsultNavigationParamList } from '@screens/tab/consult/ConsultNavigator'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import images from '@/assets/images'

import ConsultIconButton from './ConsultIconButton'

type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultHome'
>

type Props = {
	profile: ConsultantType
}

const ConsultantBox: React.FC<Props> = ({ profile }) => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<Pressable
			onPress={() =>
				navigation.navigate('ConsultantDetail', {
					consultant: profile,
				})
			}
		>
			<View
				style={css`
					width: 100%;
					flex-direction: row;
					margin-bottom: 20px;
					border-bottom-width: 1px;
					border-color: ${COLOR.GRAY.NORMAL(3)};
				`}
			>
				<Image
					source={images.consultantProfile[profile.name]}
					style={{ width: 100, height: 100 }}
				/>
				<Spacer x={16} />
				<View
					style={css`
						flex: 1;
						flex-direction: column;
					`}
				>
					<Text
						style={css`
							font-family: ${FONT.Pretendard.BOLD};
							font-size: 16px;
						`}
					>
						{profile.name} {profile.position}
					</Text>
					<Spacer y={10} />
					<Text
						style={css`
            font-family: ${FONT.Pretendard.REGULAR}
            font-size: 12px;
            `}
					>
						{profile.affiliated_unit}
					</Text>
					<Spacer y={10} />
					<View
						style={css`
							flex-direction: row;
							justify-content: flex-end;
						`}
					>
						<ConsultIconButton name="calendar-check" label="예약" />
						<Pressable>
							<ConsultIconButton name="paper-plane" label="1:1 상담" />
						</Pressable>
					</View>
					<Spacer y={12} />
				</View>
			</View>
		</Pressable>
	)
}

export default ConsultantBox
