describe("qauto_forstudy_space", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Finding elements", () => {
    it("test contains and click button", () => {
      cy.contains("About").click();
    });

    it("test find button", () => {
      cy.get("header").find("button");
    });

    it("test find children", () => {
      cy.get(".header_right").children(".header_signin");
    });

    it("test within", () => {
      cy.contains("Sign In").click();
      cy.get("div.modal-content").within(() => {
        cy.get("input").first().type("test@gmail.com");
        cy.get("input").eq(1).type("123456");
        cy.get("input").last().click();
      });
    });

    it("test filter", () => {
      cy.get(".socials_icon").filter(".icon-facebook");
    });

    it("test then", () => {
      cy.get("p")
        .invoke("text")
        .then((test) => {
          cy.log(test);
        });
    });

    it("test wrap", () => {
      cy.get("p")
        .invoke("text")
        .then((test) => {
          cy.wrap(test).should("contain", "Hillel");
        });
    });

    it("test each", () => {
      cy.get("button").each(($item, index, $list) => {
        cy.log($item.text());
        cy.log(index);
        cy.log($list);
      });
    });

    it("test each wrap", () => {
      cy.get(".socials_icon").each(($item) => {
        cy.wrap($item).should("have.class", "icon");
      });
    });

    it("test its", () => {
      cy.get(".socials_icon").its("length").should("be.eq", 5);
      cy.get(".socials_icon").its("0").should("have.class", "icon-facebook");
    });
  });

  it("Aliases", () => {
    cy.contains("Sign up").as("signUpButton");
    cy.get("@signUpButton").click();
    cy.get(".close").click();
    cy.get("@signUpButton").click();
  });
});
