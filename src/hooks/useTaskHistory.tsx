import { TaskHistory } from "../consts/index";

const useTaskHistory = (status: string): string[] => {
  const { InProgress, Done } = TaskHistory;

  switch (status) {
    case InProgress:
      return [InProgress, Done];
    case Done:
      return [Done, InProgress];
    default:
      return [];
  }
};

export default useTaskHistory;
