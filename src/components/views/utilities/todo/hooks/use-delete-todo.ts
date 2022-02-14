import { TodoNode } from "../../../../../types/todo";
import { useState } from "react";
import {
  namedOperations,
  useDeleteTodoMutation,
} from "../../../../../services/schema";

export const useDeleteTodo = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [deleteTodoMutation] = useDeleteTodoMutation({
    refetchQueries: [namedOperations.Query.GetTodos],
  });

  async function handleDeleteClick(todo: TodoNode) {
    setIsDisabled(true);
    try {
      await deleteTodoMutation({
        variables: {
          id: todo._id,
        },
      });
    } catch (e) {
      console.error(e);
    }

    setIsDisabled(false);
  }

  return {
    handleDeleteClick,
    isDisabled,
  };
};
