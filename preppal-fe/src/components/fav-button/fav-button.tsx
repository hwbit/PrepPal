import React, { useEffect } from "react";

const FavouriteButton = (user: any, recipe: any, event: any) => {
    const [favourited, setFavourite] = React.useState<boolean>(false);

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
                        "x-auth-token": token
                    },

                    body: JSON.stringify({
                        id: recipe._id
                    })
                };

                const res = await fetch("http://localhost:9001/api/recipes/", req).then(res => res.json());

                setFavourite(res.saved);
            }

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <img src={require("../../assets/logo.png")} width={20} height={20} className='bi bi-heart' alt='fav'></img>
    )
}

export default FavouriteButton;