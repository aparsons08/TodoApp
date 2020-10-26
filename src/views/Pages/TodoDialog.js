import React, { useState, useEffect } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import adminNavbarStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const TodoDialog = props => {
  const {
    open = false,
    mode = "create",
    onCreate,
    onEdit,
    onClose,
    todo = {},
    classes
  } = props || {};

  const [formTitle, setFormTitle] = useState("Create Todo");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const nameErrorText = "Please enter name";
  const descriptionErrorText = "Please enter description";

  useEffect(() => {
    setName("");
    setDescription("");
    setCompleted(false);
    setNameError(false);
    setDescriptionError(false);
    setIsReadOnly(false);
    if (open) {
      if (mode === "create") {
        setFormTitle("Create Todo");
      } else if (mode === "view") {
        setIsReadOnly(true);
        setFormTitle("View Todo");
        populateFields();
      } else if (mode === "edit") {
        setFormTitle("Update Todo");
        populateFields();
      }
    }
  }, [open]);

  const populateFields = () => {
    if (todo && todo.id) {
      setName(todo.name);
      setDescription(todo.description);
      setCompleted(todo.completed);
    }
  };

  const handleCreate = () => {
    let error = false;
    if (name) {
      setNameError(false);
    } else {
      error = true;
      setNameError(true);
    }
    if (description) {
      setDescriptionError(false);
    } else {
      error = true;
      setDescriptionError(true);
    }
    if (!error) {
      onCreate(name, description, completed);
    }
  };

  const handleEdit = () => {
    let error = false;
    if (name) {
      setNameError(false);
    } else {
      error = true;
      setNameError(true);
    }
    if (description) {
      setDescriptionError(false);
    } else {
      error = true;
      setDescriptionError(true);
    }
    if (!error) {
      onEdit(todo.id, name, description, completed);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
      PaperProps={{
        className: classes.dialogHidden
      }}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
        {formTitle}
        <Button
          variant="outlined"
          color="primary"
          disabled={isReadOnly}
          className={classes.markButton}
          style={{ position: "absolute", right: 30 }}
          onClick={() => {
            setCompleted(!completed);
          }}
        >
          {isReadOnly
            ? completed
              ? "Completed"
              : "Incomplete"
            : completed
            ? "Mask as incomplete"
            : "Mark as complete"}
        </Button>
      </DialogTitle>
      <Divider />
      <GridContainer style={{ padding: "20px 30px" }}>
        <GridItem xs={12}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            disabled={isReadOnly}
            fullWidth
            error={nameError}
            helperText={nameError && nameErrorText}
            onChange={e => {
              const val = e.target.value;
              if (val) {
                setNameError(false);
              } else {
                setNameError(true);
              }
              setName(e.target.value);
            }}
            style={{ marginBottom: 20 }}
          />
        </GridItem>
        <GridItem xs={12}>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={description}
            disabled={isReadOnly}
            fullWidth
            error={descriptionError}
            helperText={descriptionError && descriptionErrorText}
            onChange={e => {
              const val = e.target.value;
              if (val) {
                setDescriptionError(false);
              } else {
                setDescriptionError(true);
              }
              setDescription(e.target.value);
            }}
            style={{ marginBottom: 20 }}
            multiline
            rows={4}
          />
        </GridItem>
      </GridContainer>
      <div style={{ justifyContent: "flex-end", display: "flex" }}>
        <Button
          color="transparent"
          className={`${classes.transparentButton} ${isReadOnly &&
            classes.nextButton}`}
          onClick={onClose}
        >
          Close
        </Button>
        {!isReadOnly && (
          <Button
            color="primary"
            className={`${classes.transparentButton} ${classes.nextButton}`}
            onClick={mode === "edit" ? handleEdit : handleCreate}
          >
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        )}
      </div>
    </Dialog>
  );
};

TodoDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string,
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
  todo: PropTypes.object
};

export default withStyles(adminNavbarStyle)(TodoDialog);
