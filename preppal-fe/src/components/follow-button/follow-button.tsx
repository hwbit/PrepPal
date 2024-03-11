import React from "react";
import { Button } from "react-bootstrap";

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
            const res = await fetch("http://localhost:9001/api/users/followingStatus", req).then((res) => res.json());
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
                    await fetch("http://localhost:9001/api/users/followUser", req).then((res) => res.json());
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
                    await fetch("http://localhost:9001/api/users/unfollowUser", req).then((res) => res.json());
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
                onClick={handleClick}>
                Unfollow
            </Button>)
            : (<Button
                onClick={handleClick}>
                Follow
            </Button>)
    );
};

export default FollowButton;
