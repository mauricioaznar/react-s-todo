import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../global-state/redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
