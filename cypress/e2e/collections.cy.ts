/// <reference types="cypress" />

describe("Login", () => {
    const testAccount = "kenny123";
    const testPassword = "abc123";
    const testRecipe = {
        author: "kenny123",
        title: "create recipe",
        description: "Testing createRecipe API call",
        ingredients: ["item1", "item2", "item3"],
        instructions: ["step1", "step2", "step3"],
        servingSize: "2",
        prepTime: "10",
        cookingTime: "10",
        isPublic: true,
        image: "logo.png",
    };

    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("View own recipes as user", () => {
        cy.get("a[href*='/login']").click();

        cy.get("*[class^='loginForm']").within(() => {
            cy.get("[id=formUser]").type(testAccount);
            cy.get("[id=formBasicPassword]").type(testPassword);
            cy.get("button").click();
        });

        cy.get("*[class^='links navbar-nav']").within(() => {
            cy.contains("Collections").should("exist").click();
        });

        cy.get("button").contains("My Recipes").should("have.attr", "aria-selected", "true");

        cy.get("*[class^='tab-content']").within(() => {
            cy.contains("rice").should("exist");
            cy.contains("white rice is the best").should("exist");
            cy.contains("kenny123").should("exist");

            cy.get("a[href*='/recipe/65e80a7f72af9bd8f96f7075']").click();
        });

        cy.contains("rice").should("exist");
        cy.contains("white rice is the best").should("exist");
        cy.contains("kenny123").should("exist");
        cy.get("*[class^='unsaved']").should("exist");
    });

    it("View saved recipes as user", () => {
        cy.get("a[href*='/login']").click();

        cy.get("*[class^='loginForm']").within(() => {
            cy.get("[id=formUser]").type(testAccount);
            cy.get("[id=formBasicPassword]").type(testPassword);
            cy.get("button").click();
        });

        cy.get("*[class^='links navbar-nav']").within(() => {
            cy.contains("Collections").should("exist").click();
        });

        cy.get("button").contains("Favourites").click().should("have.attr", "aria-selected", "true");

        cy.get("*[class^='tab-content']").within(() => {
            cy.contains("Boiled Egg").should("exist");
            cy.contains("this is a test recipe for boiled egg").should("exist");
            cy.contains("test11").should("exist");

            cy.get("a[href*='/recipe/65d031d6c3c181f694ab9b94']").click();
        });

        cy.contains("Boiled Egg").should("exist");
        cy.contains("this is a test recipe for boiled egg").should("exist");
        cy.contains("test11").should("exist");
        cy.get("*[class^='saved']").should("exist");
    });

    it("Add recipe to my collection as user", () => {
        cy.intercept("POST", "http://localhost:9001/api/recipes/createRecipe", {
            statusCode: 200,
            body: {},
        }).as("createRecipe");

        cy.intercept("GET", "http://localhost:9001/api/users/ownRecipes", {
            statusCode: 200,
            fixture: "recipe.json",
        }).as("getOwnRecipes");

        cy.get("a[href*='/login']").click();

        cy.get("*[class^='loginForm']").within(() => {
            cy.get("[id=formUser]").type(testAccount);
            cy.get("[id=formBasicPassword]").type(testPassword);
            cy.get("button").click();
        });

        cy.get("*[class^='links navbar-nav']").within(() => {
            cy.contains("New Recipe").should("exist").click();
        });

        cy.get("*[id='title']").type(testRecipe.title);
        cy.get("*[id='description']").type(testRecipe.description);
        cy.get("*[id='ingredient']").eq(0).type(testRecipe.ingredients[0]);
        cy.get("button").contains("Add Ingredient").click();
        cy.get("*[id='ingredient']").eq(1).type(testRecipe.ingredients[1]);
        cy.get("button").contains("Add Ingredient").click();
        cy.get("*[id='ingredient']").eq(2).type(testRecipe.ingredients[2]);
        cy.get("*[id='instruction']").eq(0).type(testRecipe.instructions[0]);
        cy.get("button").contains("Add Instruction").click();
        cy.get("*[id='instruction']").eq(1).type(testRecipe.instructions[1]);
        cy.get("button").contains("Add Instruction").click();
        cy.get("*[id='instruction']").eq(2).type(testRecipe.instructions[2]);
        cy.get("*[name='servings']").type(testRecipe.servingSize);
        cy.get("*[name='prepTime']").type(testRecipe.prepTime);
        cy.get("*[name='cookingTime']").type(testRecipe.cookingTime);

        cy.get("button").contains("Submit").click();

        cy.wait("@createRecipe");

        cy.url().should("eq", "http://localhost:3000/collections");

        cy.get("*[class^='tab-content']").within(() => {
            cy.contains(testRecipe.title).should("exist");
            cy.contains(testRecipe.description).should("exist");
            cy.contains(testRecipe.author).should("exist");
        });
    });
});
