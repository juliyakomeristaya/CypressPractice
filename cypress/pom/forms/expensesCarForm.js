class ExpensesCarForm {
  get vehicleDropdown() {
    return cy.get("#addExpenseCar");
  }
  get dateInput() {
    return cy.get("#addExpenseDate");
  }
  get mileageInput() {
    return cy.get("#addExpenseMileage");
  }
  get mileageError() {
    return cy.get(".invalid-feedback");
  }
  get litersInput() {
    return cy.get("#addExpenseLiters");
  }
  get litersError() {
    return cy.get(".invalid-feedback");
  }
  get costInput() {
    return cy.get("#addExpenseTotalCost");
  }
  get costError() {
    return cy.get(".invalid-feedback");
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
  chooseBrand(brand) {
    this.brandDropdown.select(brand);
  }
  chooseModel(model) {
    this.modelDropdown.select(model);
  }
  enterMileage(mileage) {
    this.mileageInput.clear();
    this.mileageInput.type(mileage);
  }
  enterLiters(liters) {
    this.litersInput.clear().type(liters);
  }
  enterCost(cost) {
    this.costInput.clear().type(cost);
  }
  enterDate(date) {
    this.dateInput.clear().type(date);
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

export default new ExpensesCarForm();
