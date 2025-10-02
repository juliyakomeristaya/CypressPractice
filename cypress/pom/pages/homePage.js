class HomePage {
    get signInButton() {
        return cy.get('.header_signin');
    }
    openSignInForm() {
        this.signInButton.click();
    }
}

export default new HomePage();