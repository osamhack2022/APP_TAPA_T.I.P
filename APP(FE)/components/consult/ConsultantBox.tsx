import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ConsultNavigationParamList } from '@screens/tab/consult/ConsultNavigator'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import ConsultIconButton from './ConsultIconButton'

type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultHome'
>

type Props = {
	profile: undefined
}

const ConsultantBox: React.FC<Props> = () => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<Pressable
			onPress={() =>
				navigation.navigate('ConsultantDetail', {
					userId: '6pcDkIB19PVy7czW1CLbSzB0Epu2',
				})
			}
		>
			<View
				style={css`
					width: 100%;
					flex-direction: row;
					margin-bottom: 20px;
				`}
			>
				<View>
					<View
						style={css`
							width: 96px;
							height: 96px;
							justify-content: center;
							align-items: center;
							background-color: ${COLOR.GRAY.NORMAL(2)};
						`}
					>
						<FontAwesome5 name="image" size={32} />
					</View>
					<Spacer y={10} />
					<View
						style={css`
							flex-direction: row;
							justify-content: space-between;
						`}
					>
						<ConsultIconButton name="calendar-check" label="예약" />
						<Pressable>
							<ConsultIconButton name="pen" label="글쓰기" />
						</Pressable>
					</View>
				</View>
				<Spacer x={16} />
				<View
					style={css`
						flex: 1;
						flex-direction: column;
					`}
				>
					<View
						style={css`
							flex-direction: row;
							justify-content: space-between;
						`}
					>
						<Text
							style={css`
            font-family: ${FONT.Pretendard.BOLD}
            font-size: 14px;
          `}
						>
							김어쩔 상담사
						</Text>
						<Text
							style={css`
            font-family: ${FONT.Pretendard.REGULAR}
            font-size: 12px;
            `}
						>
							2시간 후 상담 가능
						</Text>
					</View>
					<Spacer y={10} />
					<Text
						style={css`
        font-family: ${FONT.Pretendard.REGULAR}
        font-size: 12px;
        `}
					>
						111사단 법무팀
					</Text>
					<Spacer y={10} />
					<View
						style={css`
							height: 90px;
							background-color: ${COLOR.GRAY.NORMAL(2)};
						`}
					/>
					<Spacer y={12} />
				</View>
			</View>
		</Pressable>
	)
}

export default ConsultantBox
