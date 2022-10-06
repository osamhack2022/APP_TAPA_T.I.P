export const COLOR = {
	ERROR: '#FF5555',
	BRAND: {
		MAIN: '#FF9200',
		TINT: (index: 1 | 2 | 3) => ['#FFF5E6', '#FFE0B3', '#FFC166'][index - 1],
		SHADE: (index: 1 | 2 | 3) => ['#CC7A00', '#995B00', '#4D2E00'][index - 1],
	},
	BLACK: (index: 1 | 2 | 3 | 4 | 5 | 6 | 7) =>
		['#666', '#555', '#444', '#333', '#222', '#111', '#000'][index - 1],
	GRAY: {
		NORMAL: (index: 1 | 2 | 3 | 4 | 5 | 6 | 7) =>
			[
				'#F2F2F2',
				'#E6E6E6',
				'#D9D9D9',
				'#CCCCCC',
				'#B3B3B3',
				'#8D8D8D',
				'#5A5A5A',
			][index - 1],
		WARM: (index: 1 | 2 | 3 | 4 | 5 | 6 | 7) =>
			[
				'#F7F6F5',
				'#EEEDEB',
				'#E6E3E1',
				'#D6D1CD',
				'#BDB5AE',
				'#8A827B',
				'#45413E',
			][index - 1],
	},
}
