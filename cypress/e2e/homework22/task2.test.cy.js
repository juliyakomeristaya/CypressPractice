import HomePage from "../../pom/pages/homePage";
import LoginForm from "../../pom/forms/logInForm";
import SidebarPage from "../../pom/pages/sidebarPage";
import ProfilePage from "../../pom/pages/profilePage";

describe("Intercepting profile", () => {
  beforeEach(() => {
    cy.visit("/");
    HomePage.openSignInForm();
    LoginForm.logIn(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
  });

  it("Should successfully intercepting name/lastName", () => {
    const fakeUserProfile = {
      status: "ok",
      data: {
        userId: 265535,
        photoFilename: "default-user.png",
        name: "Polar",
        lastName: "Bear",
      },
    };
    cy.intercept("GET", "**/profile", fakeUserProfile);
    SidebarPage.routeProfile();
    ProfilePage.validateName("Polar Bear");
  });
});
