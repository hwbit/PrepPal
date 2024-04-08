import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ReactImage from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/nav-bar/nav-bar";

const logo = require("../assets/logo.png");

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

const Signup = () => {
    const navigate = useNavigate();

    // Logic to stop submission on incomplete form.
    // React bootstrap offical validation code for forms
    const [validated, setValidated] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (submitEvent: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        submitEvent.preventDefault();
        try {
            const req = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    password,
                }),
            };
            const res = await fetch(`${backendBaseURL}/api/users/createUser`, req).then((response) => response.json());
            sessionStorage.setItem("token", res.token);
        }
        catch (err) {
            alert("something went wrong");
        }
        const token = sessionStorage.getItem("token");
        if (token) {
            if (token === "undefined") {
                alert("username already exists");
            }
            else {
                navigate("/");
            }
        }
        setValidated(true);
    };// end of React bootstrap offical validation code for forms

    return (
      <>
        <NavBar></NavBar>
        <Container className={"d-flex align-items-center justify-content-center"}>
          <Card
            className={"p-4 w-100"}
            style={{ margin: "40px", backgroundColor: "#F2E8DC", maxWidth: "450px", height: "650px" }}
          >
            <div style={{ maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
              <div className={"text-center m-4"}>
                <ReactImage
                  src={logo}
                  alt={"Logo"}
                  width={300}
                  height={250}
                  style={{ maxWidth: "100%", height: "auto" }}
                  rounded={true}
                />
              </div>
              <h2
                className={"text-center mb-4"}
                style={{ paddingBottom: "32px" }}
              >
                {" "}
                Create your account
              </h2>
              <Form
                noValidate={true}
                validated={validated}
                onSubmit={handleSubmit}
                className={"signupForm"}
              >
                <Form.Group
                  title={"username"}
                  controlId={"formUser"}
                  style={{ paddingBottom: "28px" }}
                >
                  <Form.Control
                    required={true}
                    type={"text"}
                    placeholder={"Username"}
                    onChange={(ev) => setUsername(ev.target.value)}
                  />
                  <Form.Control.Feedback type={"invalid"}>Please enter a username.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  title={"password"}
                  controlId={"formBasicPassword"}
                  style={{ paddingBottom: "28px" }}
                >
                  <Form.Control
                    required={true}
                    type={"password"}
                    placeholder={"Password"}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                  <Form.Control.Feedback type={"invalid"}>Please enter a password.</Form.Control.Feedback>
                </Form.Group>
                <div className={"d-grid gap-2"}>
                  <Button
                    className={"mx-auto"}
                    variant={"primary"}
                    type={"submit"}
                    title={"signup-button"}
                    size={"lg"}
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Container>
      </>
    );
};

export default Signup;
