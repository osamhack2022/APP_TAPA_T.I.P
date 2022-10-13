const fullNum = (num: number) => {
	return (num < 10 ? '0' : '') + num
}

export const getFullTime = (timestamp: number) => {
	const date = new Date(timestamp)
	return `${date.getFullYear()}.${fullNum(date.getMonth() + 1)}.${fullNum(
		date.getDate(),
	)}  ${fullNum(date.getHours())}:${fullNum(date.getMinutes())}`
}

export const getFullDate = (timestamp: number) => {
	const date = new Date(timestamp)
	return `${fullNum(date.getMonth() + 1)}.${fullNum(date.getDate())}`
}
