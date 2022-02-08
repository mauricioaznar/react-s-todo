import { GetTodosQuery } from '../services/schema';
import { Concrete } from './common';

export type TodoEdges = Exclude<
  Concrete<GetTodosQuery['todos']['page']['edges']>,
  null | undefined
>;
export type TodoNode = Exclude<TodoEdges[number]['node'], null | undefined>;
