import BorderButton from '@components/BorderButton'
import ConsultantBox from '@components/consult/ConsultantBox'
import ConsultHistoryBox from '@components/consult/ConsultHistoryBox'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const ConsultScreen: React.FC = () => {
	const navigation = useNavigation()

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
						<BorderButton>더보기</BorderButton>
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
						<BorderButton>더보기</BorderButton>
					</View>
				</ScrollView>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default ConsultScreen
