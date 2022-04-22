import { TodoNode } from "../../../../../types/todo";
import { useState } from "react";
import { Query, useDeleteTodoMutation } from "../../../../../services/schema";
import { nameof } from "../../../../../helpers/nameof";

export const useDeleteTodo = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [deleteTodoMutation] = useDeleteTodoMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("todos"),
      });
    },
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
