export const RESULT: {
	context: string
	description: string
	color: string
}[] = [
	{
		context: '보통',
		description: '신고를 통해 조치가 이루어지기 힘든 사안으로 보입니다.',
		color: '#3E68FF',
	},
	{
		context: '조금 위험',
		description:
			'현재로서는 그 수위가 심하지 않으나, 더 심한 행동으로 악화될 가능성이 보입니다.',
		color: '#36B37E',
	},
	{
		context: '위험',
		description:
			'가해자에 의한 피해 상황이 명백해 보입니다. 전문 상담사와 상담해볼 것을 추천드립니다.',
		color: '#FFAB00',
	},
	{
		context: '매우위험',
		description:
			'시급한 조치가 필요하신 것으로 보입니다. 즉시 상담사와 연락할 수 있도록 도와드리겠습니다.',
		color: '#FF5555',
	},
]
