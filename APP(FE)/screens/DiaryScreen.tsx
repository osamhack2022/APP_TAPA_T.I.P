import DiaryList from '@components/DiaryList'
import Spacer from '@components/Spacer'
import { css } from '@emotion/native'
import { RootStackScreenProps } from '@navigators/RootStack'
import { ScrollView, Text, View } from 'react-native'

import { FONT } from '@/constants/font'

type Props = RootStackScreenProps<'Diary'>

const DiaryScreen: React.FC<Props> = props => {
	const { navigation, route } = props

	return (
		<ScrollView
			contentInset={{
				bottom: 24,
			}}
		>
			<View
				style={css`
					padding: 24px 16px;
				`}
			>
				<Text
					style={css`
						font-size: 32px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					📔 나의 기록 돌아보기
				</Text>
				<Spacer y={24} />
				<DiaryList />
			</View>
		</ScrollView>
	)
}

export default DiaryScreen
