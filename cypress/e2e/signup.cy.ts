/// <reference types="cypress" />

describe("Signup", () => {
    const testAccount = "testApiSandboxAccount";
    const testPassword = "lp12asr35Sa45";

    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Successful signup as user", () => {
        cy.intercept("POST", "http://localhost:9001/api/users/createUser", {
            statusCode: 200,
            fixture: "token.json",
        });

        cy.get("a[href*='/login']").click();

        cy.get("a[href*='/signup']").click();

        cy.get("*[class^='signupForm']").within(() => {
            cy.get("[id=formUser]").type("random-testing-user");
            cy.get("[id=formBasicPassword]").type("123456");
            cy.get("button").click();
        });

        cy.get("*[class^='links navbar-nav']").within(() => {
            cy.contains("Profile").should("exist");
            cy.contains("Collections").should("exist");
            cy.contains("New Recipe").should("exist");
            cy.contains("Login").should("not.exist");
        });
    });

    it("Failed signup as user", () => {
        cy.get("a[href*='/login']").click();

        cy.get("a[href*='/signup']").click();

        cy.get("*[class^='signupForm']").within(() => {
            cy.get("[id=formUser]").type(testAccount);
            cy.get("[id=formBasicPassword]").type(testPassword);
            cy.get("button").click().then(() => {
                cy.on("window:alert", (text) => {
                    expect(text).to.eq("username already exists");
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
