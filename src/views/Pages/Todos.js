import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {
  successColor,
  whiteColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import PropTypes from "prop-types";
import adminNavbarStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TodoDialog from "./TodoDialog";
import {
  createTodo,
  deleteTodo,
  updateTodo,
  markTodoAsComplete,
  markTodoAsIncomplete
} from "../../services/redux/actions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
  newTaskButton: {
    color: "white",
    backgroundColor: "#00acc1 !important",
    "&:hover": {
      backgroundColor: "#00acc1 !important",
      color: "white"
    }
  },
  dialogHidden: {
    overflow: "unset",
    scrollbarWidth: "thin"
  },
  transparentButton: {
    padding: "12px 25px",
    borderRadius: 0
  },
  nextButton: {
    backgroundColor: "#00acc1 !important",
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#00acc1 !important"
    }
  },
  button: {
    padding: "1px 7px"
  },
  markButton: {
    color: "#00acc1",
    borderColor: "#00acc1",
    "&:hover": {
      borderColor: "#00acc1"
    }
  }
}));

const Contact = props => {
  const {
    todos,
    createTodo,
    deleteTodo,
    updateTodo,
    markTodoAsComplete,
    markTodoAsIncomplete,
    classes
  } = props || {};

  const [openTodoDialog, setOpenTodoDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [todoDialogMode, setTodoDialogMode] = useState("create");

  const customStyles = useStyles();

  const onCreate = (name, description, completed) => {
    createTodo({
      name,
      description,
      completed
    });
    setOpenTodoDialog(false);
  };

  const onEdit = (id, name, description, completed) => {
    updateTodo({
      id,
      name,
      description,
      completed
    });
    setOpenTodoDialog(false);
  };

  const onClose = () => {
    setOpenTodoDialog(false);
  };

  return (
    <GridContainer>
      <TodoDialog
        open={openTodoDialog}
        classes={customStyles}
        mode={todoDialogMode}
        todo={selectedTodo}
        onCreate={onCreate}
        onEdit={onEdit}
        onClose={onClose}
      />
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <GridContainer>
              <GridItem sm={8} md={8} xs={8}>
                <h4
                  style={{
                    color: "#3C4858",
                    fontSize: "2.3em"
                  }}
                >
                  Todos
                </h4>
              </GridItem>
              <GridItem
                sm={4}
                md={4}
                xs={4}
                style={{
                  justifyContent: "end",
                  alignItems: "center",
                  display: "flex"
                }}
              >
                <Button
                  className={`${classes.button} ${customStyles.newTaskButton}`}
                  color={"transparent"}
                  onClick={() => {
                    setTodoDialogMode("create");
                    setSelectedTodo({});
                    setOpenTodoDialog(true);
                  }}
                >
                  Add Task
                </Button>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <Divider />
          <CardBody>
            <GridContainer>
              <GridItem sm={12} md={12} xs={12}>
                <List className={classes.root}>
                  {todos &&
                    todos.length > 0 &&
                    todos.map(todo => (
                      <>
                        <ListItem
                          key={todo.id}
                          role={undefined}
                          dense
                          button
                          onClick={() => {
                            setSelectedTodo(todo);
                            setTodoDialogMode("view");
                            setOpenTodoDialog(true);
                          }}
                        >
                          <ListItemIcon>
                            {todo.completed ? (
                              <CheckCircleIcon
                                style={{ color: successColor[0] }}
                              />
                            ) : (
                              <CheckCircleOutlineIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={todo.name} />
                          <ListItemSecondaryAction>
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                              className={`${customStyles.button} ${customStyles.markButton}`}
                              onClick={() => {
                                if (todo.completed) {
                                  markTodoAsIncomplete(todo.id);
                                } else {
                                  markTodoAsComplete(todo.id);
                                }
                              }}
                            >
                              {todo.completed
                                ? "Mask as incomplete"
                                : "Mark as complete"}
                            </Button>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => {
                                setSelectedTodo(todo);
                                setTodoDialogMode("edit");
                                setOpenTodoDialog(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => {
                                deleteTodo(todo.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                </List>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  setContactDetails: PropTypes.func
};

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

//make this component available to the app
const contactPageWithRedux = connect(
  mapStateToProps,
  {
    createTodo,
    deleteTodo,
    updateTodo,
    markTodoAsComplete,
    markTodoAsIncomplete
  }
)(Contact);

export default withStyles(adminNavbarStyle)(contactPageWithRedux);
