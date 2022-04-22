import { EnhancedContainerProps } from "../../../../dum/enhanced-table/types";
import { TodoEdges } from "../../../../../types/todo";

export default interface EnhancedTodoContainerProps<T>
  extends EnhancedContainerProps<T> {
  edges: TodoEdges | undefined | null;
}
