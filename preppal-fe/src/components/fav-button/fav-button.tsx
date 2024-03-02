import React from "react";

const FavouriteButton = (recipe: any) => {
    const [favourite, setFavourite] = React.useState<boolean>(false);

    async function saveRecipe(saveRecipeId: string, save: boolean) {
        const token = sessionStorage.getItem("token");
        try {
            if (token) {
                if (save) {
                    const req = {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },

                        body: JSON.stringify({ recipeId: saveRecipeId }),
                    };
                    const res = await fetch("http://localhost:9001/api/user/saveRecipe", req).then((res) => res.json());
                }
                else {
                    const req = {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },

                        body: JSON.stringify({ recipeId: saveRecipeId }),
                    };
                    const res = await fetch("http://localhost:9001/api/user/unsaveRecipe", req).then((res) => res.json());
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleClick(): void {
        setFavourite(!favourite);
        saveRecipe(recipe.id, favourite);
    }

    return (
        favourite
            ? (<img
                onClick={handleClick}
                src={require("../../assets/filled-heart.png")}
                width={40}
                height={40}
                alt={"fav"}>
            </img>)
            : (<img
                onClick={handleClick}
                src={require("../../assets/unfilled-heart.png")}
                width={40}
                height={40}
                alt={"fav"}>
            </img>)
    );
};

export default FavouriteButton;
