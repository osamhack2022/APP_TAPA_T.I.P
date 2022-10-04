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
