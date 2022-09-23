/*

Imported from geist-org/geist-ui
https://github.com/geist-org/geist-ui/blob/master/components/use-current-state/use-current-state.ts

라이브러리 전체를 가져올 필요는 없어서 유틸리티 훅만 가져왔어요.
*/
import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'

export type CurrentStateType<S> = [
	S,
	Dispatch<SetStateAction<S>>,
	MutableRefObject<S>,
]

const useCurrentState = <S>(
	initialState: S | (() => S),
): CurrentStateType<S> => {
	const [state, setState] = useState<S>(() => {
		return typeof initialState === 'function'
			? (initialState as () => S)()
			: initialState
	})
	const ref = useRef<S>(initialState as S)

	useEffect(() => {
		ref.current = state
	}, [state])

	const setValue = (val: SetStateAction<S>) => {
		const result =
			typeof val === 'function'
				? (val as (prevState: S) => S)(ref.current)
				: val
		ref.current = result
		setState(result)
	}

	return [state, setValue, ref]
}

export default useCurrentState
