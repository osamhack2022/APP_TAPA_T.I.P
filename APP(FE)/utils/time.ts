const fullNum = (num: number) => {
	return (num < 10 ? '0' : '') + num
}

export const getFullTime = (date: Date) => {
	return `${date.getFullYear()}.${fullNum(date.getMonth() + 1)}.${fullNum(
		date.getDate(),
	)}  ${fullNum(date.getHours())}:${fullNum(date.getMinutes())}`
}

export const getFullDate = (date: Date) => {
	return `${fullNum(date.getMonth() + 1)}.${fullNum(date.getDate())}`
}
