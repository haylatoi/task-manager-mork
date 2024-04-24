import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditOutlined from "@material-ui/icons/EditOutlined";

import { ITaskItem } from "../interfaces/index";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4caf50",
    display: "inline-block",
    padding: "0 15px",
    borderRadius: "15px",
  },
  pos: {
    display: "none",
    fontSize: 10,
    marginBottom: 12,
  },
  editIcon: {
    fontSize: 16,
  },
});

const TaskItem: React.FC<ITaskItem> = ({
  id,
  title,
  description,
  startDay,
  endDay,
  status,
}) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {id}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <Typography variant="body2" component="p">
          {startDay}
        </Typography>
        <Typography variant="body2" component="p">
          {endDay}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography className={classes.title} gutterBottom>
          {status}
        </Typography>
        <IconButton
          size="small"
          aria-label="edit"
          component={Link}
          to={`/edit/${id}`}
          color="primary"
        >
          <EditOutlined className={classes.editIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskItem;
