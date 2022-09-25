import styled, { css } from '@emotion/native'
import { RootStackScreenProps } from '@navigators/RootStackNavigator'
import { Pressable, SafeAreaView, Text } from 'react-native'
import PagerView from 'react-native-pager-view'

import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'

const Container = styled.View`
	padding: 24px;
`

const OnBoarding: React.FC<RootStackScreenProps<'OnBoarding'>> = ({
	navigation,
	route,
}) => {
	return (
		<SafeAreaView
			style={css`
				background: #000;
				flex: 1;
			`}
		>
			<Container>
				<Text
					style={css`
						text-align: center;
						color: #fff;
						font-size: 18px;
					`}
				>
					TAPA가 처음이신가요?
				</Text>
			</Container>
			<PagerView
				style={css`
					flex: 1;
				`}
			>
				<Page1 key="1" />
				<Page2 key="2" />
				<Page3 key="3" />
				<Page4 key="4" />
			</PagerView>
			<Container>
				<Pressable
					onPress={() => navigation.popToTop()}
					style={state => [
						css`
							border: solid #fff 1px;
							border-radius: 12px;
							padding: 16px;
						`,
						state.pressed &&
							css`
								opacity: 0.4;
							`,
					]}
				>
					<Text
						style={css`
							text-align: center;
							color: #fff;
							font-size: 18px;
						`}
					>
						바로가기
					</Text>
				</Pressable>
			</Container>
		</SafeAreaView>
	)
}

export default OnBoarding
