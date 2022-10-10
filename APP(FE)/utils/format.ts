export const formatServiceNumber = (str: string) => {
	const stripped = str.replace(/[^\d]/g, '')
	if (stripped.length <= 2) {
		return stripped
	}
	return `${stripped.substring(0, 2)}-${stripped.substring(2)}`
}

export const formatDate = (str: string) => {
	const stripped = str.replace(/[^\d]/g, '')
	if (stripped.length <= 4) {
		return stripped
	}
	if (stripped.length <= 6) {
		return `${stripped.substring(0, 4)}.${stripped.substring(4)}`
	}
	return `${stripped.substring(0, 4)}.${stripped.substring(
		4,
		6,
	)}.${stripped.substring(6, 8)}`
}
