import { ActionTypes } from "../consts/index";
import { ITaskItem, ITaskAction } from "../interfaces/index";

export const addTask = (task: ITaskItem): ITaskAction => ({
  type: ActionTypes.Add,
  payload: task,
});

export const editTask = (id: string, updates: ITaskItem): ITaskAction => ({
  type: ActionTypes.Edit,
  id,
  updates,
});

export const removeTask = (id: string): ITaskAction => ({
  type: ActionTypes.Delete,
  id,
});
