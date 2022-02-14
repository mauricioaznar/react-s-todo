import * as React from "react";
import { useSnackbar } from "notistack";
import { useTypedSelector } from "../../../hooks/redux-hooks/use-typed-selector";

const GlobalMessagesSnackbar = () => {
  const { globalMessages } = useTypedSelector((state) => state.globalMessages);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (globalMessages.length > 0) {
      const { message, variant } = globalMessages[globalMessages.length - 1];

      if (message !== "") {
        enqueueSnackbar(message, { variant });
      }
    }
  }, [globalMessages]);

  return null;
};

export default GlobalMessagesSnackbar;
