import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import { css } from '@emotion/native'
import { useRootStackNavigation } from '@navigators/RootStack'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { FONT } from '@/constants/font'

const Button: React.FC<
	React.ComponentProps<typeof Pressable> & {
		children: string
	}
> = ({ style, children, ...passProps }) => (
	<Pressable
		{...passProps}
		style={state => {
			const customStyle = typeof style === 'function' ? style(state) : style
			return [
				css`
					background: #007aff;
					padding: 12px 24px;
					border-radius: 4px;
				`,
				state.pressed &&
					css`
						background: #0a84ff;
					`,
				customStyle,
			]
		}}
	>
		<Text
			style={css`
				font-family: ${FONT.Pretendard.BOLD};
				text-align: center;
				color: #fff;
			`}
		>
			{children}
		</Text>
	</Pressable>
)

const UserScreen: React.FC = () => {
	const navigation = useRootStackNavigation()
	return (
		<>
			<View
				style={css`
					flex: 1;
					justify-content: center;
					padding: 20px;
				`}
			>
				<Text>UserScreen</Text>
				<Spacer y={12} />
				<Button
					onPress={() => {
						navigation.push('SignUp', { trap: false })
					}}
				>
					회원가입
				</Button>
				<Spacer y={12} />
				<Button>로그인</Button>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default UserScreen
