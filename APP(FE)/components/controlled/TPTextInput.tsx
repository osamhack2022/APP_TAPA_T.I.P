import TPTextInput from '@components/TPTextInput'
import React from 'react'
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
} from 'react-hook-form'

type Props<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
	React.ComponentProps<typeof TPTextInput>

const ControlledTPTextInput = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: Props<TFieldValues, TName>,
): React.ReactElement => {
	const {
		name,
		rules,
		shouldUnregister,
		defaultValue,
		control,
		...textInputProps
	} = props

	const controllerProps = {
		name,
		rules,
		shouldUnregister,
		defaultValue,
		control,
	}

	return (
		<Controller
			{...controllerProps}
			render={({
				field: { onBlur, onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<TPTextInput
					{...textInputProps}
					error={error?.message}
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
				/>
			)}
		/>
	)
}

export default ControlledTPTextInput
