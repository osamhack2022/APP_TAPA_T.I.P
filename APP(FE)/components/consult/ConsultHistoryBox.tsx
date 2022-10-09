import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'
type Props = {
	profile: undefined
}
const ConsultHistoryBox: React.FC<Props> = () => {
	return (
		<View
			style={css`
				width: 100%;
				margin-bottom: 20px;
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
					읽지 않음
				</Text>
			</View>
			<Spacer y={10} />
			<Text
				style={css`
        font-family: ${FONT.Pretendard.REGULAR}
        font-size: 14px;
        `}
			>
				이런 경우 부당한 근무 조건으로 볼 수 있을까요?
			</Text>
			<Spacer y={10} />
			<View
				style={css`
					height: 90px;
					background-color: ${COLOR.GRAY.NORMAL(2)};
				`}
			/>
		</View>
	)
}

export default ConsultHistoryBox
