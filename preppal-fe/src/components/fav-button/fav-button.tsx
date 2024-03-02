import React from "react";

const FavouriteButton = (recipe: any) => {
    const [favourited, setFavourite] = React.useState<boolean>(false);
    const recipeId = recipe.id
    React.useEffect(() => {
        saveRecipe();
    }, [favourited]);


    async function saveRecipe() {
        const token = sessionStorage.getItem('token');
        try {
            if (token) {
                const req = {
                    method: "POST",

                    headers: {
                        'Content-Type': 'application/json',
                        "x-auth-token": token
                    },

                    body: JSON.stringify({
                        "recipeId": recipeId
                    })
                };

                const res = await fetch("http://localhost:9001/api/user/favRecipe", req).then(res => res.json());

                setFavourite(res.saved);
            }

        } catch (err) {
            console.log(err);
        }

    }

    function handleClick(event: any): void {
        setFavourite(!favourited);
    }

    return (
        favourited 
        ? <img onClick={handleClick} src={require("../../assets/filled-heart.png")} width={40} height={40} alt='fav'></img>
        : <img onClick={handleClick} src={require("../../assets/unfilled-heart.png")} width={40} height={40} alt='fav'></img>
    )
}

export default FavouriteButton;