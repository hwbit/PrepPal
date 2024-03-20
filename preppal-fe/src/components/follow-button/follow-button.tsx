import React from "react";
import { Button } from "react-bootstrap";

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

const FollowButton = (user: any) => {
    const [isFollowing, setFollowing] = React.useState<boolean>();

    React.useEffect(() => {
        followStatus(user.username).then(result => setFollowing(result));
    }, [user.username]);

    async function followStatus(username: string) {
        const token = sessionStorage.getItem("token");
        let following = false;
        if (token && token !== "undefined") {
            const req = {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },

                body: JSON.stringify({ username: username }),
            };
            const res = await fetch(backendBaseURL+"/api/users/followingStatus", req).then((res) => res.json());
            following = res?.status ?? false;
        }
        return following;
    }

    async function followUser(username: string, following: boolean) {
        const token = sessionStorage.getItem("token");
        try {
            if (token && token !== "undefined") {
                if (following) {
                    const req = {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },

                        body: JSON.stringify({ username: username }),
                    };
                    await fetch(backendBaseURL+"/api/users/followUser", req).then((res) => res.json());
                }
                else {
                    const req = {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },

                        body: JSON.stringify({ username: username }),
                    };
                    await fetch(backendBaseURL+"/api/users/unfollowUser", req).then((res) => res.json());
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleClick(): void {
        setFollowing(!isFollowing);
        followUser(user.username, !isFollowing);
    }

    return (
        isFollowing
            ? (<Button
                onClick={handleClick}
                style={{ backgroundColor: "#401E01" }}>
                Unfollow
            </Button>)
            : (<Button
                onClick={handleClick}
                style={{ backgroundColor: "#401E01" }}>
                Follow
            </Button>)
    );
};

export default FollowButton;
