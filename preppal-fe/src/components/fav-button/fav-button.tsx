import React from "react";

const FavouriteButton = (recipe: any) => {
    const [favourite, setFavourite] = React.useState<boolean>();

    React.useEffect(() => {
        saveStatus(recipe.id).then(result => setFavourite(result));
    }, [recipe.id]);

    async function saveStatus(id: string) {
        const token = sessionStorage.getItem("token");
        let saved = false;
        if (token && token !== "undefined") {
            const req = {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },

                body: JSON.stringify({ recipeId: id }),
            };
            const res = await fetch("http://localhost:9001/api/users/saveRecipeStatus", req).then((res) => res.json());
            saved = res?.status ?? false;
        }
        return saved;
    }

    async function updateSavedRecipes(saveRecipeId: string, save: boolean) {
        const token = sessionStorage.getItem("token");
        try {
            if (token && token !== "undefined") {
                if (save) {
                    const req = {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },

                        body: JSON.stringify({ recipeId: saveRecipeId }),
                    };
                    await fetch("http://localhost:9001/api/users/saveRecipe", req).then((res) => res.json());
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
                    await fetch("http://localhost:9001/api/users/unsaveRecipe", req).then((res) => res.json());
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleClick(): void {
        setFavourite(!favourite);
        updateSavedRecipes(recipe.id, !favourite);
    }

    return (
        favourite
            ? (<img
                onClick={handleClick}
                className="saved"
                src={require("../../assets/filled-heart.png")}
                width={40}
                height={40}
                alt={"fav"}>
            </img>)
            : (<img
                onClick={handleClick}
                className="unsaved"
                src={require("../../assets/unfilled-heart.png")}
                width={40}
                height={40}
                alt={"fav"}>
            </img>)
    );
};

export default FavouriteButton;
