import * as React from "react";
import { useSnackbar } from "notistack";
import ApolloErrorSeparator from "../constants/apollo-error-separator";

interface MauSnackbarProps {
  message: string;
  variant?: "error" | "success";
}

const MauSnackbar = ({ message, variant = "error" }: MauSnackbarProps) => {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (message !== "") {
      const messages = message.split(ApolloErrorSeparator);

      messages.forEach((m) => {
        enqueueSnackbar(m, { variant });
      });
    }
  }, [message]);

  return null;
};

export default MauSnackbar;
