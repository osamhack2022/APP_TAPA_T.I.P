import * as ImagePicker from 'expo-image-picker'

import { sha1digest } from './crypto'
import { uploadFileBytes } from './firebase'

export class ImagePickerCancelledError extends Error {}

const uriToBlob = async (uri: string) => {
	const fetchRes = await fetch(uri)
	return fetchRes.blob()
}

export const uploadImageBlob = async (blob: Blob, prefix: string) => {
	const hash = await sha1digest(blob)
	const newFile = new File([blob], `${hash}.jpeg`, {
		type: 'image/jpeg',
	})

	console.log({ newFile })
	return uploadFileBytes(`${prefix}/${hash}.jpeg`, newFile)
}

export const openImagePickerAsBlob = async (
	args: ImagePicker.ImagePickerOptions,
): Promise<Blob> => {
	const res = await ImagePicker.launchImageLibraryAsync(args)
	if (res.cancelled) throw new ImagePickerCancelledError('User cancelled')
	return uriToBlob(res.uri)
}

export const openImagePickerAsBlobMultiple = async (
	args: ImagePicker.ImagePickerOptions,
): Promise<Blob[]> => {
	const res = (await ImagePicker.launchImageLibraryAsync(
		args,
	)) as ImagePicker.ImagePickerMultipleResult
	if (res.cancelled) throw new ImagePickerCancelledError('User cancelled')
	return Promise.all(res.selected.map(info => uriToBlob(info.uri)))
}
