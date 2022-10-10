import styled, { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

import { FONT } from '@constants/font'

import Spacer from './Spacer'

type Props = {
	type?: 'notice' | 'error' | 'warning'
	title?: string
	children?: string | never[]
	style?: StyleProp<ViewStyle>
}

const PALETTE = {
	notice: ['#eaeaea', '#0044ff', '#222'],
	// warning: ['#eaeaea', '#ffbb00'],
	// error: ['#eaeaea', '#ff4343'],
	warning: ['#ffecc2', '#ffbb00', '#ffb700'],
	error: ['#ffcbcb', '#ff4343', '#ff4343'],
}

const TPNote: React.FC<Props> = ({ type, title, style, children }) => {
	return (
		<TPNoteRoot type={type} style={style}>
			<TPNoteIcon type={type} />
			<View
				style={css`
					flex-shrink: 1;
					margin-left: 8px;
				`}
			>
				{title && (
					<Text
						style={css`
							color: ${PALETTE[type ?? 'notice'][1]};
							font-size: 14px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						{title}
					</Text>
				)}
				{title && typeof children === 'string' && <Spacer y={4} />}
				{typeof children === 'string' && (
					<Text
						style={css`
							color: ${PALETTE[type ?? 'notice'][2]};
							font-size: 14px;
						`}
					>
						{children}
					</Text>
				)}
			</View>
		</TPNoteRoot>
	)
}

const TPNoteRoot = styled.View<{
	type: Props['type']
}>`
	flex-direction: row;
	background: ${({ type }) => PALETTE[type ?? 'notice'][0]};
	border-radius: 12px;
	padding: 12px 12px 12px 8px;
`

const TPNoteIcon: React.FC<{ type: Props['type'] }> = ({ type }) =>
	({
		notice: (
			<FontAwesome5
				name="info-circle"
				size={16}
				color={PALETTE[type ?? 'notice'][1]}
			/>
		),
		warning: (
			<FontAwesome5
				name="exclamation-triangle"
				size={16}
				color={PALETTE[type ?? 'notice'][1]}
			/>
		),
		error: (
			<FontAwesome5
				name="exclamation-circle"
				size={16}
				color={PALETTE[type ?? 'notice'][1]}
			/>
		),
	}[type ?? 'notice'])

export default TPNote
