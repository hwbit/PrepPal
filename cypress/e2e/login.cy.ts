/// <reference types="cypress" />

describe("Login", () => {
    const testAccount = "testApiSandboxAccount";
    const testPassword = "lp12asr35Sa45";

    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Successful login in as user", () => {
        cy.get("a[href*='/login']").click();

        cy.get("*[class^='loginForm']").within(() => {
            cy.get("[id=formUser]").type(testAccount);
            cy.get("[id=formBasicPassword]").type(testPassword);
            cy.get("button").click();
        });

        cy.get("*[class^='links navbar-nav']").within(() => {
            cy.contains("Profile").should("exist");
            cy.contains("Collections").should("exist");
            cy.contains("New Recipe").should("exist");
            cy.contains("Login").should("not.exist");
        });
    });

    it("Failed login in as user", () => {
        cy.get("a[href*='/login']").click();

        cy.get("*[class^='loginForm']").within(() => {
            cy.get("[id=formUser]").type("fake user account");
            cy.get("[id=formBasicPassword]").type(testPassword);
            cy.get("button").click().then(() => {
                cy.on("window:alert", (text) => {
                    expect(text).to.eq("Wrong username or password");
                });
            });
        });

        cy.get("*[class^='links navbar-nav']").within(() => {
            cy.contains("Login").should("exist");
            cy.contains("Profile").should("not.exist");
            cy.contains("Collections").should("not.exist");
            cy.contains("New Recipe").should("not.exist");
        });
    });
});
