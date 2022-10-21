import * as Crypto from 'expo-crypto'
import { CryptoDigestAlgorithm, CryptoEncoding } from 'expo-crypto'

export const sha1digest = async (data: Blob) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(data)
		reader.onloadend = ev => {
			Crypto.digestStringAsync(
				CryptoDigestAlgorithm.SHA1,
				reader.result as string,
				{
					encoding: CryptoEncoding.HEX,
				},
			)
				.then(resolve)
				.catch(reject)
		}
		reader.onerror = reject
	})
