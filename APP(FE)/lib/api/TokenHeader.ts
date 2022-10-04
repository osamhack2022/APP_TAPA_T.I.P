// request에 넣어보낼 token 설정하는 코드인데 전반적으로 수정이 필요합니다..

class TokenHeader {
	static accessToken = ''

	static setAccessToken(accessToken: string) {
		this.accessToken = accessToken
	}

	static getHeader(params?: object) {
		return {
			headers: {
				Authorization:
					this.accessToken === '' ? undefined : `Bearer ${this.accessToken}`,
			},
			params,
		}
	}
}

export default TokenHeader
