import HomePage from "../../pom/pages/homePage";
import GaragePage from "../../pom/pages/garagePage";
import ExpensesPage from "../../pom/pages/expensesPage";
import ExpensesCarForm from "../../pom/forms/expensesCarForm";
import LoginForm from "../../pom/forms/logInForm";
import AddCarForm from "../../pom/forms/addCarForm";
import EditCarForm from "../../pom/forms/editCarForm";
import RemoveConfirmForm from "../../pom/forms/removeConfirmForm";
import SidebarPage from "../../pom/pages/sidebarPage";

describe("Garage page", () => {
    let date = Date.now();
    let formattedDate = new Date(date).toLocaleDateString('uk-UA');

  beforeEach(() => {
    cy.visit("/");
    HomePage.openSignInForm();
    LoginForm.logIn(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
  });

  context("Garage page tests", () => {
    let data = {
      brand: 1,
      model: 0,
      mileage: 1000
    }
    it("Should successfully add car", () => {
      GaragePage.openAddCarForm();
      AddCarForm.addCar(data.brand, data.model, data.mileage);
      GaragePage.garageList.should("be.visible")
          .should("have.length.at.least", 1);
      GaragePage.validateAddedCarTitle("BMW 3");
      GaragePage.validateAddedCarMileageDate(`Update mileage • ${formattedDate}`);
      GaragePage.validateAddedCarMileageInput(data.mileage);
    });

    it("Should validate Mileage empty field when add car", () => {
      GaragePage.openAddCarForm();
      AddCarForm.mileageInput.focus().blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      AddCarForm.mileageError.should("be.visible")
        .should("contain.text", "Mileage cost required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      AddCarForm.cancelAdding();
    });

    it("Should validate Mileage field (bigger than 999999) when add car", () => {
      GaragePage.openAddCarForm();
      AddCarForm.mileageInput.type(1000000).blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      AddCarForm.mileageError.should("be.visible")
        .should("contain.text", "Mileage has to be from 0 to 999999")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      AddCarForm.cancelAdding();
    });

    it("Should validate Mileage field (less than 0) when add car", () => {
      GaragePage.openAddCarForm();
      AddCarForm.mileageInput.type(-1).blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      AddCarForm.mileageError.should("be.visible")
        .should("contain.text", "Mileage has to be from 0 to 999999")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      AddCarForm.cancelAdding();
    });

    it("Should successfully edit car", () => {
      GaragePage.addCar();
      GaragePage.openEditCarForm();
      EditCarForm.enterMileage(1100);
      EditCarForm.clickSaveCar();
      GaragePage.garageList.should("be.visible");
    });

    it("Should successfully remove car", () => {
     GaragePage.addCar();
     GaragePage.garageList.its('length').then((initialCount) => {
     GaragePage.openEditCarForm();
     EditCarForm.removeCar();
     RemoveConfirmForm.confirmRemove();
     GaragePage.garageList.should("have.length", initialCount - 1);
      });
    });
  });

  context("Expenses page tests", () => {
    let data = {
      date: formattedDate,
      mileage: 1010,
      liters: 50,
      cost: 100
    }
    it("Should visit Expenses page and check expense button (without cars)", () => {
      SidebarPage.routeExpenses();
      ExpensesPage.expenseTitle.should("be.visible")
        .should("contain.text", "Fuel expenses");
      ExpensesPage.expenseButton.should("be.visible")
        .should("be.disabled")
        .should("contain.text", "Add an expense");
      ExpensesPage.expenseEmptyPageText.should("be.visible")
        .should("contain.text", "You don’t have any cars in your garage");
    });
    it("Should visit Expenses page and check expense button (with car)", () => {
      GaragePage.addCar();
      SidebarPage.routeExpenses();
      ExpensesPage.expenseTitle.should("be.visible")
        .should("contain.text", "Fuel expenses");
      ExpensesPage.expenseButton.should("be.visible")
        .should("be.enabled")
        .should("contain.text", "Add an expense");
      ExpensesPage.expenseEmptyPageText.should("be.visible")
        .should("contain.text", "You don’t have any fuel expenses filed in");
    });
    it("Should successfully add expense", () => {
      GaragePage.addCar();
      SidebarPage.routeExpenses();
      ExpensesPage.addExpense(data.date, data.mileage, data.liters, data.cost);
      ExpensesPage.expenseTableRows.should("be.visible")
        .should("have.length", 1)
        .should("contain.text", data.date)
        .should("contain.text", data.mileage)
        .should("contain.text", data.liters)
        .should("contain.text", data.cost);
    });
    it("Should successfully edit expense", () => {
      GaragePage.addCar();
      SidebarPage.routeExpenses();
      ExpensesPage.addExpense(data.date, data.mileage, data.liters, data.cost);
      ExpensesPage.editExpense(data.mileage+10, data.liters+10, data.cost+100);
      ExpensesPage.expenseTableRows.should("be.visible")
        .should("have.length", 1)
        .should("contain.text", data.date)
        .should("contain.text", data.mileage+10)
        .should("contain.text", data.liters+10)
        .should("contain.text", data.cost+100);
    });
    it("Should successfully remove expense", () => {
      GaragePage.addCar();
      SidebarPage.routeExpenses();
      ExpensesPage.addExpense(data.date, data.mileage, data.liters, data.cost);
      ExpensesPage.removeExpense();
      RemoveConfirmForm.confirmRemove();
      ExpensesPage.expenseTableRows.should("have.length", 0);
    });
    it("Should validate Mileage empty field when add expense", () => {
      GaragePage.addCar();
      SidebarPage.routeExpenses();
      ExpensesPage.expenseButton.click();
      ExpensesCarForm.mileageInput.clear().blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      ExpensesCarForm.mileageError.should("be.visible")
        .should("contain.text", "Mileage required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      ExpensesCarForm.cancelAdding();
    });
    it("Should validate Liters empty field when add expense", () => {
      GaragePage.addCar();
      SidebarPage.routeExpenses();
      ExpensesPage.expenseButton.click();
      ExpensesCarForm.litersInput.clear().blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      ExpensesCarForm.litersError.should("be.visible")
        .should("contain.text", "Liters required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      ExpensesCarForm.cancelAdding();
    });
    it("Should validate Cost empty field when add expense", () => {
      GaragePage.addCar();
      SidebarPage.routeExpenses();
      ExpensesPage.expenseButton.click();
      ExpensesCarForm.costInput.clear().blur()
        .should("have.css", "border-color", "rgb(220, 53, 69)");
      ExpensesCarForm.costError.should("be.visible")
        .should("contain.text", "Total cost required")
        .should("have.css", "Color", "rgb(220, 53, 69)");
      ExpensesCarForm.cancelAdding();
    });
  });

afterEach(() => {
    SidebarPage.routeGarage();
    GaragePage.garageBody.should("be.visible");
    GaragePage.removeAllCars();
  });
});
