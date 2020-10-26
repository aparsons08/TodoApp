import React, { useState, useEffect } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setContactDetails } from "../../services/redux/actions";

const Contact = props => {
  const { contactDetails, setContactDetails } = props || {};

  useEffect(() => {
    const { firstName, lastName, email, comments } = contactDetails || {};
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setComments(comments);
  }, [props]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  const firstNameErrorText = "Please enter first name";
  const lastNameErrorText = "Please enter last name";
  const emailErrorText = "Please enter email address";
  const commentsErrorText = "Please enter comments";

  const onSubmit = () => {
    let error = false;
    if (firstName) {
      setFirstNameError(false);
    } else {
      setFirstNameError(true);
      error = true;
    }
    if (lastName) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
      error = true;
    }
    if (email) {
      setEmailError(false);
    } else {
      setEmailError(true);
      error = true;
    }
    if (comments) {
      setCommentsError(false);
    } else {
      setCommentsError(true);
      error = true;
    }
    if (!error) {
      const contactDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        comments: comments
      };
      setContactDetails(contactDetails);
      alert("Submitted");
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <h4
              style={{
                color: "#3C4858",
                fontSize: "2.3em"
              }}
            >
              Contact
            </h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <GridContainer>
              <GridItem sm={12} md={12} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  error={firstNameError}
                  helperText={firstNameError && firstNameErrorText}
                  value={firstName}
                  fullWidth
                  onChange={e => {
                    const val = e.target.value;
                    if (val) {
                      setFirstNameError(false);
                    } else {
                      setFirstNameError(true);
                    }
                    setFirstName(val);
                  }}
                  style={{ marginBottom: 20 }}
                />
              </GridItem>
              <GridItem sm={12} md={12} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  error={lastNameError}
                  helperText={lastNameError && lastNameErrorText}
                  value={lastName}
                  fullWidth
                  onChange={e => {
                    const val = e.target.value;
                    if (val) {
                      setLastNameError(false);
                    } else {
                      setLastNameError(true);
                    }
                    setLastName(val);
                  }}
                  style={{ marginBottom: 20 }}
                />
              </GridItem>
              <GridItem sm={12} md={12} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailError && emailErrorText}
                  value={email}
                  fullWidth
                  onChange={e => {
                    const val = e.target.value;
                    if (val) {
                      setEmailError(false);
                    } else {
                      setEmailError(true);
                    }
                    setEmail(val);
                  }}
                  style={{ marginBottom: 20 }}
                />
              </GridItem>
              <GridItem sm={12} md={12} sx={12}>
                <TextField
                  id="outlined-basic"
                  label="Comments"
                  variant="outlined"
                  error={commentsError}
                  helperText={commentsError && commentsErrorText}
                  value={comments}
                  fullWidth
                  onChange={e => {
                    const val = e.target.value;
                    if (val) {
                      setCommentsError(false);
                    } else {
                      setCommentsError(true);
                    }
                    setComments(val);
                  }}
                  style={{ marginBottom: 20 }}
                  multiline
                  rows={4}
                />
              </GridItem>
              <GridItem sm={12} md={12} sx={12}>
                <Button variant="contained" onClick={onSubmit}>
                  Submit
                </Button>
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
    contactDetails: state.contactDetails
  };
};

//make this component available to the app
export default connect(
  mapStateToProps,
  {
    setContactDetails
  }
)(Contact);
