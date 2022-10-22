import ConsultantBox from '@components/consult/ConsultantBox'
import ConsultHistoryBox from '@components/consult/ConsultHistoryBox'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { userAtom } from '@store/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import { ConsultNavigationParamList } from './ConsultNavigator'

type NavigationProp = StackNavigationProp<
	ConsultNavigationParamList,
	'ConsultHome'
>

const ConsultHomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const user = useAtomValue(userAtom)
	// useEffect(() => {
	// 	navigation.setOptions({
	// 		headerRightContainerStyle: {
	// 			paddingRight: 12,
	// 		},
	// 		headerRight: props => {
	// 			return (
	// 				<Pressable onPress={() => navigation.navigate('')}>
	// 					<FontAwesome5 name="envelope" solid size={16} />
	// 				</Pressable>
	// 			)
	// 		},
	// 	})
	// 	console.log(user?.uid)
	// }, [])

	return (
		<>
			<View
				style={css`
					flex: 1;
				`}
			>
				<ScrollView>
					<View
						style={css`
							padding: 10px 20px;
							align-items: center;
						`}
					>
						<Text
							style={css`
								font-family: ${FONT.Pretendard.BOLD};
								font-size: 16px;
							`}
						>
							상담 신청
						</Text>
						<Spacer y={10} />
						<ConsultantBox profile={undefined} />
						<ConsultantBox profile={undefined} />
						<Spacer y={10} />
						<TPButton
							variant="inline"
							size="small"
							style={css`
								height: 32px;
								width: 100px;
								border-radius: 16px;
							`}
						>
							더보기
						</TPButton>
						<Spacer y={10} />
					</View>
					<Spacer y={10} />
					<View
						style={css`
							padding: 10px 20px;
							align-items: center;
						`}
					>
						<Text
							style={css`
								font-family: ${FONT.Pretendard.BOLD};
								font-size: 16px;
							`}
						>
							내 상담 내역
						</Text>
						<Spacer y={10} />
						<ConsultHistoryBox profile={undefined} />
						<ConsultHistoryBox profile={undefined} />
						<Spacer y={10} />
						<TPButton
							variant="inline"
							size="small"
							style={css`
								height: 32px;
								width: 100px;
								border-radius: 16px;
							`}
						>
							더보기
						</TPButton>
					</View>
				</ScrollView>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default ConsultHomeScreen
