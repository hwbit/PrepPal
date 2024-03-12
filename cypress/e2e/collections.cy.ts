/// <reference types="cypress" />

describe("Login", () => {
    const testAccount = "kenny123";
    const testPassword = "abc123";

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
});
