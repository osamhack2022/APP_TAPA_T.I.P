import FadingDots from '@components/FadingDots'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useSafeUserQuery } from '@hooks/data/user'
import { ScrollView, Text, View } from 'react-native'

const HomeScreen: React.FC = () => {
	const userQuery = useSafeUserQuery()

	return (
		<>
			<View
				style={css`
					flex: 1;
				`}
			>
				<ScrollView
					style={css`
						padding: 20px;
					`}
				>
					<View
						style={css`
							justify-content: flex-start;
						`}
					>
						<View
							style={css`
								flex-direction: row;
								align-items: center;
							`}
						>
							{!userQuery.isLoading && userQuery.data ? (
								<Text
									style={css`
										font-size: 24px;
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									{userQuery.data.name} {userQuery.data.rank}
								</Text>
							) : (
								<FadingDots />
							)}
							<Text
								style={css`
									font-size: 24px;
									font-family: ${FONT.Pretendard.BOLD};
								`}
							>
								님,
							</Text>
						</View>
						<Text
							style={css`
								font-size: 18px;
							`}
						>
							☺️ 오늘도 좋은 하루 되세요!
						</Text>
					</View>
				</ScrollView>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default HomeScreen
