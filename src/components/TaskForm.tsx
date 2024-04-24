import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

import { ITaskItem } from "../interfaces/index";
import { TaskFormMode, TaskHistory } from "../consts/index";
import useTaskHistory from "../hooks/useTaskHistory";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: 30,
    },
    select: {
      border: 0,
      fontSize: 16,
      color: "#000",
      display: "block",
      width: "100%",
      borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
      marginBottom: 30,
      paddingBottom: 5,
    },
    floatRight: {
      float: "right",
    },
  })
);

interface IComponentProps {
  task?: ITaskItem | undefined;
  onSubmit: (task: ITaskItem) => void;
}

const TaskForm: React.FC<IComponentProps> = (props) => {
  const classes = useStyles();

  const [error, setError] = useState("");

  const [mode] = useState(props.task ? "edit" : "create");

  const [id] = useState(props.task ? props.task.id : "");
  const [title, setTitle] = useState(props.task ? props.task.title : "");
  const [description, setDescription] = useState(
    props.task ? props.task.description : ""
  );
  const [status, setStatus] = useState(
    props.task ? props.task.status : TaskHistory.InProgress
  );
  const [startDay, setStrartDay] = useState(
    props.task ? props.task.startDay : ""
  );
  const [endDay, setEndDay] = useState(props.task ? props.task.endDay : "");

  const taskHistoryBasedStatus = useTaskHistory(status);

  const onTitleChange = (e: FormEvent) => {
    const title = (e.target as HTMLInputElement).value;
    setTitle(title);
  };

  const onDescriptionChange = (e: FormEvent) => {
    const description = (e.target as HTMLTextAreaElement).value;
    setDescription(description);
  };

  const onStartDayChange = (e: FormEvent) => {
    const startDay = (e.target as HTMLTextAreaElement).value;
    setStrartDay(startDay);
  };

  const onEndDayChange = (e: FormEvent) => {
    const endDay = (e.target as HTMLTextAreaElement).value;
    setEndDay(endDay);
  };

  const onStatusChange = (e: FormEvent) => {
    const status = (e.target as HTMLSelectElement).value;
    setStatus(status);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      setError("'Please fill Title and Description.'");
    } else {
      setError("");

      if (mode === TaskFormMode.Create) {
        props.onSubmit({
          id: nanoid(8),
          title,
          description,
          status,
          startDay,
          endDay,
        });
      } else {
        props.onSubmit({
          id,
          title,
          description,
          status,
          startDay,
          endDay,
        });
      }
    }
  };

  return (
    <>
      {error && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError("");
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}

      <form onSubmit={submitHandler}>
        <TextField
          fullWidth
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          className={classes.input}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
          className={classes.input}
        />

        <Input
          type="date"
          fullWidth
          placeholder="Start Day"
          value={startDay}
          onChange={onStartDayChange}
          className={classes.input}
        />

        <Input
          type="date"
          fullWidth
          placeholder="End Day"
          value={endDay}
          onChange={onEndDayChange}
          className={classes.input}
        />

        {mode === TaskFormMode.Edit ? (
          <select
            value={status}
            onChange={onStatusChange}
            className={classes.select}
          >
            {taskHistoryBasedStatus.map((status: string, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>
        ) : undefined}

        {mode === TaskFormMode.Create ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
          >
            {" "}
            Add Task{" "}
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
          >
            {" "}
            Edit Task{" "}
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          component={Link}
          to={"/"}
          className={classes.floatRight}
        >
          Cancel
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
