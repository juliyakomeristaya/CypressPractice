class RemoveConfirmForm {
    get removeButton() {
        return cy.get('.modal-footer .btn.btn-danger');
    }
    get cancelButton() {
        return cy.get('.modal-footer .btn.btn-secondary');
    }
    get removeFormText() {
        return cy.get('.modal-body');
    }
    get removeFormTitle(){
        return cy.get('.h4.modal-title');
    }
    get removeCloseButton() {
        return cy.get('.button.close');
    }

    confirmRemove() {
        this.removeButton.click();
    }
}

export default new RemoveConfirmForm();