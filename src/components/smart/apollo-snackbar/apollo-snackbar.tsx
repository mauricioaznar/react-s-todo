import * as React from "react";
import { useSnackbar } from "notistack";
import ApolloErrorSeparator from "../../../constants/apollo-error-separator";

interface ApolloSnackbarProps {
  message: string;
  variant?: "error" | "success";
}

const ApolloSnackbar = ({
  message,
  variant = "error",
}: ApolloSnackbarProps) => {
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

export default ApolloSnackbar;
