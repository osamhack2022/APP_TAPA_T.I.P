import * as Notifications from 'expo-notifications'
import { DateTime } from 'luxon'

export const scheduleLocalNotification = async ({
	title,
	message,
	trigger = DateTime.now()
		.plus({
			second: 5,
		})
		.toJSDate(),
}: {
	title: string
	message: string
	trigger?: Date
}) => {
	return Notifications.scheduleNotificationAsync({
		content: {
			title,
			body: message,
		},
		trigger,
	})
}
