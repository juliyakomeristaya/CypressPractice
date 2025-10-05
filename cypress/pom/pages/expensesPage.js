import ExpensesCarForm from "../../pom/forms/expensesCarForm";
class ExpensesPage {
    get expensesList() {
        return cy.get('.panel-page_content');
    }
    get expenseButton() {
        return cy.get('.item-group .btn.btn-primary');
    }
    get expenseTitle() {
        return cy.get('h1');
    }
    get expenseEmptyPageText() {
        return cy.get('.panel-page_empty');
    }
    get expenseTable() {
        return cy.get('.expenses_table-wrapper');
    }
    get expenseTableRows() {
        return cy.get('.expenses_table-wrapper tbody tr');
    }
    get expenseTableDeleteButton() {
        return cy.get('button.btn.btn-delete');
    }
    get expenseTableEditButton() {
        return cy.get('button.btn.btn-edit');
    }
    addExpense(date, mileage, liters, cost) {
        this.expenseButton.click();
        ExpensesCarForm.enterDate(date);
        ExpensesCarForm.enterMileage(mileage);
        ExpensesCarForm.enterLiters(liters);
        ExpensesCarForm.enterCost(cost);
        ExpensesCarForm.clickSaveCar();
    }
    editExpense(mileage, liters, cost) {
        this.expenseTableEditButton.click({ force: true });
        ExpensesCarForm.enterMileage(mileage);
        ExpensesCarForm.enterLiters(liters);
        ExpensesCarForm.enterCost(cost);
        ExpensesCarForm.clickSaveCar();
    }
    removeExpense() {
        this.expenseTableDeleteButton.click({ force: true });
    }
}

export default new ExpensesPage();