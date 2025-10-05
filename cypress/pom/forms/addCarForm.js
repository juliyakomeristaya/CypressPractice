class AddCarForm {
    get brandDropdown() {
        return cy.get('#addCarBrand');
    }
    get modelDropdown() {
        return cy.get('#addCarModel');
    }
    get mileageInput() {
        return cy.get('#addCarMileage');
    }
    get mileageError() {
        return cy.get('.invalid-feedback');
    }
    get addButton() {
        return cy.get('.modal-footer .btn.btn-primary');
    }
    get cancelButton() {
        return cy.get('.modal-footer .btn.btn-secondary');
    }
    get closeButton() {
        return cy.get('.modal-header .close');
    }
    chooseBrand(brand) {
        this.brandDropdown.select(brand);
    }
    chooseModel(model) {
        this.modelDropdown.select(model);
    }
    enterMileage(mileage) {
        this.mileageInput.type(mileage);
    }
    clickAddCar() {
        this.addButton.click();
    }
    cancelAdding() {
        this.cancelButton.click();
    }
    closeAdding() {
        this.closeButton.click();
    }
    addCar(brand, model, mileage) {
        this.chooseBrand(brand);
        this.chooseModel(model);
        this.enterMileage(mileage);
        this.clickAddCar();
    }
}

export default new AddCarForm();