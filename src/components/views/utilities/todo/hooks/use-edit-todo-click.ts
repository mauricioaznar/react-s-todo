import { useHistory } from "react-router-dom";
import { TodoNode } from "../../../../../types/todo";

export const useEditTodoClick = () => {
  const history = useHistory();

  function handleEditTodoClick(todo: TodoNode) {
    history.push("/todoForm", { todo });
  }

  return { handleEditTodoClick };
};
