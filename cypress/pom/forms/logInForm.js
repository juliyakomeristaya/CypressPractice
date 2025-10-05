class LoginForm {
    get emailInput() {
        return cy.get('#signinEmail');
    }
    get passwordInput() {
        return cy.get('#signinPassword');
    }
    get loginButton() {
        return cy.get('.modal-footer .btn-primary');
    }
    logIn(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.loginButton.click();
    }
}

export default new LoginForm();