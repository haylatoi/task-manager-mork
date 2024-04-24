import { ActionTypes } from "../consts/index";

export interface ITaskItem {
  id: string;
  title: string;
  description: string;
  status: string;
  startDay: string;
  endDay: string;
}

export type ITasksState = ITaskItem[];

export type ITaskAction =
  | { type: ActionTypes.Fetch; tasks: ITaskItem[] }
  | { type: ActionTypes.Add; payload: ITaskItem }
  | { type: ActionTypes.Edit; id: string; updates: ITaskItem }
  | { type: ActionTypes.Delete; id: string };

export interface IContextModel {
  state: ITasksState;
  dispatch: React.Dispatch<ITaskAction>;
}

export interface IFilterTask {
  text: string;
  status: string;
}
