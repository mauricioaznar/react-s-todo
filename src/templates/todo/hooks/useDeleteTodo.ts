import {TodoNode} from "../../../types/todo";
import {ApolloError} from "@apollo/client";
import {useState} from "react";
import {namedOperations, useDeleteTodoMutation} from "../../../schema";

export const useDeleteTodo = () => {

    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')
    const [deleteTodoMutation] = useDeleteTodoMutation({
        refetchQueries: [namedOperations.Query.GetTodos]
    })


    async function handleDeleteClick(todo: TodoNode) {
        setIsDisabled(true)
        try {
            await deleteTodoMutation({
                variables: {
                    id: todo._id
                }
            })
        } catch (e) {
            if (e instanceof ApolloError) {
                setMessage(e.message)
            }
        }
        setMessage('')
        setIsDisabled(false)
    }

    return {
        handleDeleteClick,
        message,
        isDisabled
    }

}
