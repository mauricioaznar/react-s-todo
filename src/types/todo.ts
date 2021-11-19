import {GetTodosQuery} from "../schema";
import {Concrete} from "./common";


export type TodoEdges = Exclude<Concrete<GetTodosQuery['todos']['page']['edges']>, null | undefined>
export type TodoItem = TodoEdges[number]
export type TodoNode = Exclude<TodoEdges[number]['node'], null | undefined>
