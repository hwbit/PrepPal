import React from "react";
import { Container, Form, Button, Card, Image as ReactImage } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/nav-bar/nav-bar";

const logo = require("../assets/logo.png");

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

const Login = () => {
    // For Forms
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const loginClick = async (loginEvent: { preventDefault: () => void; }) => {
        loginEvent.preventDefault();
        try {
            const req = {
                method: "POST",

                headers: {"Content-Type": "application/json"},

                body: JSON.stringify({
                    username,
                    password,
                }),
            };

            const res = await fetch(`${backendBaseURL}/api/auth/`, req).then((response) => response.json());
            sessionStorage.setItem("token", res.token);
        }
        catch (err) {
            console.error(err);
        }
        const token = sessionStorage.getItem("token");
        if (token) {
            if (token === "undefined") {
                alert("Wrong username or password");
            }
            else {
                sessionStorage.setItem("username", username);
                navigate("/");
            }
        }
    };

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
              <h2 className={"text-center mb-4"}>Sign in</h2>
              <Form
                className={"loginForm"}
                onSubmit={loginClick}
              >
                <Form.Group
                  title={"username"}
                  controlId={"formUser"}
                  style={{ paddingBottom: "16px" }}
                >
                  <Form.Control
                    type={"text"}
                    placeholder={"Username"}
                    onChange={(ev) => setUsername(ev.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  title={"password"}
                  controlId={"formBasicPassword"}
                  style={{ paddingBottom: "8px" }}
                >
                  <Form.Control
                    type={"password"}
                    placeholder={"Password"}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </Form.Group>

                <div className={"d-grid gap-2"}>
                  <Button
                    className={"mx-auto"}
                    variant={"primary"}
                    type={"submit"}
                    title={"login-button"}
                    size={"lg"}
                  >
                    Login
                  </Button>
                </div>
              </Form>
              <div className={"mt-3 text-center"}>
                <p>
                  Don&apos;t have an account?
                  <a
                    href={"/signup"}
                    title={"signup-link"}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </>
    );
};

export default Login;
