import { useState } from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

type Props = Omit<RefreshControlProps, 'onRefresh'> & {
	onRefresh: () => Promise<void>
}

const SmartRefreshControl: React.FC<Props> = ({ onRefresh, ...props }) => {
	const [isRefetchedByUserAction, setIsRefetchedByUserAction] = useState(false)

	return (
		<RefreshControl
			onRefresh={async () => {
				setIsRefetchedByUserAction(true)
				await onRefresh()
				setIsRefetchedByUserAction(false)
			}}
			{...props}
			refreshing={isRefetchedByUserAction && props.refreshing}
		/>
	)
}

export default SmartRefreshControl
