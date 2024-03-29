import Card from "react-bootstrap/Card";
import ReactImage from "react-bootstrap/Image";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React from "react";
import NavBar from "../components/nav-bar/nav-bar";
import RecipeCatalog from "../components/recipe-catalog/recipe-catalog";
import FollowButton from "../components/follow-button/follow-button";

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

function Profile() {
    const [username, setUsername] = React.useState("");
    const [userBio, setBio] = React.useState("");
    const [userFollowing, setFollowing] = React.useState<any[]>([]);
    const [userFollowingCount, setFollowingCount] = React.useState<number>(0);
    const [recipes, setRecipes] = React.useState<any[]>([]);
    const [userImage, setImage] = React.useState(process.env.DEFAULT_LOGO_URL);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [myProfile, setMyProfile] = React.useState(false);

    const params = useParams();

    React.useEffect(() => {
        fillUserContent();
        // eslint-disable-next-line
    }, [params]);

    const fillUserContent = async () => {
        const token = sessionStorage.getItem("token");
        const myUsername = sessionStorage.getItem("username") ?? "";

      if(token && token !== "undefined") {
        setLoggedIn(true);
      }

      try {
          if (params.username && params.username !== "" && myUsername !== params.username) {
                  const req = {
                      method: "GET",
                      headers: {
                          "Content-type": "application/json"
                      }
                  };
                  const res = await fetch(`${backendBaseURL}/api/users/lookup/${params.username}`, req).then(res => res.json());
                  setUsername(res.username);
                  setBio(res.bio);
                  setFollowingCount(res.following.length);
                  setRecipes(res.recipes);
                  setImage(res.image);

          }
          else if (token && token !== "undefined") {
              const req = {
                  method: "GET",
                  headers: {
                      "x-auth-token": token
                  }
              };
              const res = await fetch(`${backendBaseURL}/api/auth/`, req).then(res => res.json());
              setUsername(res.username);
              setBio(res.bio);
              setFollowing(res.following);
              setFollowingCount(res.following.length);
              setImage(res.image);
              setMyProfile(true);

                sessionStorage.setItem("username", res.username);
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
      <>
        <NavBar></NavBar>
        <div className={"py-3"}>
          <Row className={"p-3 d-flex"}>
            <div
              className={"w-100"}
              style={{ maxWidth: "2000px" }}
            >
              <Card
                className={"p-4 d-flex"}
                style={{ backgroundColor: "#F2E8DC" }}
              >
                <Card.Header className={"d-flex align-items-center"}>
                  <Col className={"d-flex justify-content-start align-items-center"}>
                    <ReactImage
                      src={userImage}
                      alt={"userImage"}
                      rounded={true}
                      style={{ maxWidth: "200px" }}
                    />
                    <Card.Title className={"p-2"}>{username}</Card.Title>
                  </Col>
                  <Col>
                    <Stack gap={3}>
                      <div className={"d-flex justify-content-end"}>
                        {myProfile ? (
                          <Button
                            className={"d-flex"}
                            variant={"primary"}
                            href={"edit-profile"}
                            title={"Edit"}
                            size={"sm"}
                            style={{ maxWidth: "40px", backgroundColor: "#401E01" }}
                          >
                            Edit
                          </Button>
                        )
                            : (loggedIn && (
                              <FollowButton
                                title={"Follow"}
                                username={username}
                              >
                              </FollowButton>
                            ))}
                      </div>
                      <Card.Subtitle className={"d-flex justify-content-end"}>
                        Following: {userFollowingCount}
                      </Card.Subtitle>
                    </Stack>
                  </Col>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Bio</Card.Title>
                  <Card.Subtitle>{userBio}</Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
          </Row>
          <Row className={"px-3"}>
            <div
              className={"w-100"}
              style={{ maxWidth: "2000px" }}
            >
              <Card
                className={"p-4"}
                style={{ backgroundColor: "#F2E8DC" }}
              >
                <Card.Header>
                  <Card.Title>{myProfile ? "Following" : "Recipes"}</Card.Title>
                </Card.Header>
                <Card.Body>
                  {myProfile ? userFollowing.map((user) => (
                    <p key={user}>{user}</p>
                  ))
                      : <RecipeCatalog catalog={recipes}></RecipeCatalog>}
                </Card.Body>
              </Card>
            </div>
          </Row>
        </div>
      </>
    );
}

export default Profile;
