import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../global-state/redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
