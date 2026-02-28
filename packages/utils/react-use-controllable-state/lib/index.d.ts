type ChangeHandler<T, M = undefined> = (state: T, details?: M) => void;
type SetStateFn<T, M = undefined> = (value: T | ((prev: T) => T), details?: M) => void;
interface UseControllableStateParams<T, M = undefined> {
    prop?: T | undefined;
    defaultProp: T;
    onChange?: ChangeHandler<T, M>;
    caller?: string;
}
declare function useControllableState<T, M = undefined>({ prop, defaultProp, onChange, caller, }: UseControllableStateParams<T, M>): [T, SetStateFn<T, M>];

export { useControllableState };
