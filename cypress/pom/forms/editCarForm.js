class EditCarForm {
  get brandDropdown() {
    return cy.get("#addCarBrand");
  }
  get modelDropdown() {
    return cy.get("#addCarModel");
  }
  get mileageInput() {
    return cy.get("#addCarMileage");
  }
  get saveButton() {
    return cy.get(".modal-footer .btn.btn-primary");
  }
  get cancelButton() {
    return cy.get(".modal-footer .btn.btn-secondary");
  }
  get closeButton() {
    return cy.get(".modal-header .close");
  }
  get removeCarButton() {
    return cy.get(".modal-footer .btn.btn-outline-danger");
  }
  chooseBrand(brand) {
    this.brandDropdown.select(brand);
  }
  chooseModel(model) {
    this.modelDropdown.select(model);
  }
  enterMileage(mileage) {
    this.mileageInput.clear().type(mileage);
  }
  clickSaveCar() {
    this.saveButton.click();
  }
  cancelAdding() {
    this.cancelButton.click();
  }
  closeAdding() {
    this.closeButton.click();
  }
  removeCar() {
    this.removeCarButton.click();
  }
}

export default new EditCarForm();
