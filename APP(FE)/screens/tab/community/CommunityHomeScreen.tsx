import HomePostListItem from '@components/community/home/HomePostListItem'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'

import { PostType } from '@/lib/types/community'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

const samplePost: PostType = {
	id: 1,
	user_id: 1,
	title: '이런 경우엔 조치가 가능할까요?',
	content: 'ㅈㄱㄴ',
	views: 10,
	created_at: new Date('2022-10-05'),
	updated_at: new Date('2022-10-05'),
}

const CommunityHomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<>
			<View
				style={css`
					flex: 1;
				`}
			>
				<View
					style={css`
						width: 100%;
						padding: 11px 20px;
						margin-top: 10px;
						background-color: white;
					`}
				>
					<Text
						style={css`
							margin-bottom: 10px;
							font-weight: bold;
						`}
					>
						Best
					</Text>
					<HomePostListItem post={samplePost} />
					<HomePostListItem post={samplePost} />
					<HomePostListItem post={samplePost} />
				</View>
				<View
					style={css`
						width: 100%;
						padding: 11px 20px;
						margin-top: 10px;
						background-color: white;
					`}
				>
					<Text
						style={css`
							margin-bottom: 10px;
							font-weight: bold;
						`}
					>
						New
					</Text>
					<HomePostListItem post={samplePost} />
					<HomePostListItem post={samplePost} />
					<HomePostListItem post={samplePost} />
				</View>
				<TouchableOpacity
					style={css`
						width: 100%;
						padding: 11px 20px;
						background-color: white;
						margin-top: 10px;
					`}
					onPress={() => navigation.navigate('CommunityForum')}
				>
					<View>
						<Text>질문 게시판</Text>
						<Text>자신이 당한 일에 대해 자유롭게 질문하는 공간</Text>
					</View>
				</TouchableOpacity>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default CommunityHomeScreen
