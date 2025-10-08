describe("Registration form", () => {
  let testData;

  before(() => {
    cy.fixture("registrationTestData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  context("Form Registration", () => {
    let email;

    it("Should contain SingUp labels", () => {
      cy.contains("Sign up").click();
      cy.get("h4").should("contain.text", "Registration");
      cy.get("button.close").should("be.visible");
      cy.get("div.modal-body").within(() => {
        cy.get("label[for=signupEmail]").eq(0).should("contain.text", "Name");
        cy.get("label[for=signupEmail]")
          .eq(1)
          .should("contain.text", "Last name");
        cy.get("label[for=signupEmail]").eq(2).should("contain.text", "Email");
      });
      cy.get("label[for=signupPassword]")
        .should("be.visible")
        .should("contain.text", "Password");
      cy.get("label[for=signupRepeatPassword]")
        .should("be.visible")
        .should("contain.text", "Re-enter password");
      cy.get("button.btn.btn-primary")
        .should("be.visible")
        .should("contain.text", "Register")
        .should("be.disabled");
    });

    it("Should successfully register with Valid data", () => {
      email = `${testData.validData.emailPrefix}${Date.now()}${testData.validData.emailDomain}`;

      cy.contains("Sign up").click();
      cy.get("#signupName").type(testData.validData.name).blur();
      cy.get("#signupLastName").type(testData.validData.lastName).blur();
      cy.get("#signupEmail").type(email).blur();
      cy.get("#signupPassword").type(testData.validData.password).blur();
      cy.get("#signupRepeatPassword").type(testData.validData.password).blur();
      cy.get("div.modal-footer button")
        .should("be.visible")
        .should("be.enabled")
        .click();
      cy.url().should("include", "/panel/garage");
    });

    it("Should display error message User already exists", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName").type(testData.validData.name).blur();
      cy.get("#signupLastName").type(testData.validData.lastName).blur();
      cy.get("#signupEmail").type(email).blur();
      cy.get("#signupPassword").type(testData.validData.password).blur();
      cy.get("#signupRepeatPassword").type(testData.validData.password).blur();
      cy.get("div.modal-footer button")
        .should("be.visible")
        .should("be.enabled")
        .click();
      cy.get("p.alert.alert-danger").should(
        "contain.text",
        "User already exists",
      );
    });
  });

  context("Validation field Name", () => {
    it("Empty field ", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName")
        .focus()
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Name required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      cy.get("#signupLastName").should(
        "not.have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    it("Invalid name - 1 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName")
        .type("A")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Name has to be from 2 to 20 characters long")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid name - length more than 20 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName")
        .type("Awertyuiopasdfghjklzd")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Name has to be from 2 to 20 characters long")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid name - not only letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName")
        .type("Yulia!")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Name is invalid")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid name - space with letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName")
        .type(" Yulia")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Name is invalid")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Valid name - other fields are empty", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName")
        .type("Yuliya")
        .blur()
        .should("have.css", "border-color", "rgb(206, 212, 218)");
      cy.get("#signupName").should(
        "have.css",
        "border-color",
        "rgb(206, 212, 218)",
      );
      cy.get("button.btn.btn-primary")
        .should("be.visible")
        .should("be.disabled");
    });
  });

  context("Validation field LastName", () => {
    it("Empty field ", () => {
      cy.contains("Sign up").click();
      cy.get("#signupLastName")
        .focus()
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Last name required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      cy.get("#signupEmail").should(
        "not.have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    it("Invalid lastname - 1 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupLastName")
        .type("A")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should(
          "contain.text",
          "Last name has to be from 2 to 20 characters long",
        )
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid lastname - length more than 20 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupLastName")
        .type("Awertyuiopasdfghjklzd")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should(
          "contain.text",
          "Last name has to be from 2 to 20 characters long",
        )
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid lastname - not only letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupLastName")
        .type("Yulia!")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Last name is invalid")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid lastname - space with letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupLastName")
        .type(" Yulia ")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Last name is invalid")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Valid lastname - other fields are empty", () => {
      cy.contains("Sign up").click();
      cy.get("#signupLastName")
        .type("Komerista")
        .blur()
        .should("have.css", "border-color", "rgb(206, 212, 218)");
      cy.get("#signupLastName").should(
        "have.css",
        "border-color",
        "rgb(206, 212, 218)",
      );
      cy.get("button.btn.btn-primary")
        .should("be.visible")
        .should("be.disabled");
    });
  });

  context("Validation field Email", () => {
    it("Empty field ", () => {
      cy.contains("Sign up").click();
      cy.get("#signupEmail")
        .focus()
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Email required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      cy.get("#signupPassword").should(
        "not.have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    it("Invalid Email - 1 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupEmail")
        .type("A")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Email is incorrect")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid Email - length more than 20 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupEmail")
        .type("Awertyuiopasdfghjklzd")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Email is incorrect")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid Email - not only letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupEmail")
        .type("Yulia@")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Email is incorrect")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Valid Email - other fields are empty", () => {
      cy.contains("Sign up").click();
      cy.get("#signupEmail")
        .type("Yulia@gmail.com")
        .blur()
        .should("have.css", "border-color", "rgb(206, 212, 218)");
      cy.get("button.btn.btn-primary")
        .should("be.visible")
        .should("be.disabled");
    });
  });

  context("Validation field Password", () => {
    it("Empty field ", () => {
      cy.contains("Sign up").click();
      cy.get("#signupPassword")
        .focus()
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Password required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      cy.get("#signupRepeatPassword").should(
        "not.have.css",
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    it("Invalid Password - 1 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupPassword")
        .type("A")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("have.css", "Color", "rgb(220, 53, 69)")
        .should(
          "contain.text",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        );
    });
    it("Invalid Password - length more than 16 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupPassword")
        .type("Passwordcharacter166666677")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("have.css", "Color", "rgb(220, 53, 69)")
        .should(
          "contain.text",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        );
    });
    it("Invalid Password - only letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupPassword")
        .type("YuliaTest")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("have.css", "Color", "rgb(220, 53, 69)")
        .should(
          "contain.text",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        );
    });
    it("Valid Password - other fields are empty", () => {
      cy.contains("Sign up").click();
      cy.get("#signupPassword")
        .type("YuliaTest12345!")
        .blur()
        .should("have.css", "border-color", "rgb(206, 212, 218)");
      cy.get("button.btn.btn-primary")
        .should("be.visible")
        .should("be.disabled");
    });
  });

  context("Validation field RepeatPassword", () => {
    it("Empty field ", () => {
      cy.contains("Sign up").click();
      cy.get("#signupRepeatPassword")
        .focus()
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Re-enter password required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
    it("Invalid RepeatPassword - 1 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupRepeatPassword")
        .type("A")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("have.css", "Color", "rgb(220, 53, 69)")
        .should(
          "contain.text",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        );
    });
    it("Invalid RepeatPassword - length more than 16 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupRepeatPassword")
        .type("Passwordcharacter166666677")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("have.css", "Color", "rgb(220, 53, 69)")
        .should(
          "contain.text",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        );
    });
    it("Invalid RepeatPassword - only letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupRepeatPassword")
        .type("YuliaTest")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("have.css", "Color", "rgb(220, 53, 69)")
        .should(
          "contain.text",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        );
    });
    it("Valid RepeatPassword - other fields are empty", () => {
      cy.contains("Sign up").click();
      cy.get("#signupRepeatPassword")
        .type("YuliaTest12345!")
        .blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("div.invalid-feedback p")
        .eq(0)
        .should("contain.text", "Passwords do not match")
        .should("have.css", "Color", "rgb(220, 53, 69)");
    });
  });
});
