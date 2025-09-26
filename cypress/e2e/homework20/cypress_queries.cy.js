describe("qauto_forstudy_space", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Form SingUp labels", () => {
      cy.contains("Sign up").click();
      cy.get("h4").should("contain.text", "Registration");
      cy.get("button.close").should("be.visible");
      cy.get("div.modal-body").within(() => {
        cy.get("label[for=signupEmail]").eq(0).should("contain.text", "Name");
        cy.get("label[for=signupEmail]").eq(1).should("contain.text", "Last name");
        cy.get("label[for=signupEmail]").eq(2).should("contain.text", "Email");
      });
      cy.get("label[for=signupPassword]").should("be.visible").should("contain.text", "Password");
      cy.get("label[for=signupRepeatPassword]").should("be.visible").should("contain.text", "Re-enter password");
      cy.get("button.btn.btn-primary")
        .should("be.visible")
        .should("contain.text", "Register")
        .should("be.disabled");
    });

  context("Fields Name", () => {
    it("Empty field ", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName").focus().blur();
      cy.get("div.invalid-feedback p").eq(0)
        .should("contain.text", "Name required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      cy.get("#signupName").should("have.css", "border-color", "rgb(220, 53, 69)");
      cy.get("#signupLastName").should("not.have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Invalid name - 1 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName").type("A").blur();
      cy.get("div.invalid-feedback p").eq(0)
        .should("contain.text", "Name has to be from 2 to 20 characters long")
    });
    it("Invalid name - length more than 20 character", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName").type("Awertyuiopasdfghjklzd").blur();
      cy.get("div.invalid-feedback p").eq(0)
        .should("contain.text", "Name has to be from 2 to 20 characters long")
    });
    it("Invalid name - not only letters", () => {
      cy.contains("Sign up").click();
      cy.get("#signupName").type("Yulia!").blur();
      cy.get("div.invalid-feedback p").eq(0)
        .should("contain.text", "Name is invalid")
    }); 
  });

  context("Field LastName", () => {
    it("Empty field", () => {
      cy.contains("Sign up").click();   
      cy.get("#signupName").focus().blur();
    });
  });
});
