class ProfilePage {
  get profileName() {
    return cy.get(".profile_name");
  }
  validateName(name) {
    this.profileName.should("contain.text", name);
  }
}

export default new ProfilePage();
