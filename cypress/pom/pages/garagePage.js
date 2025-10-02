import EditCarForm from "../../pom/forms/editCarForm";
import RemoveCarForm from "../forms/removeConfirmForm";
import AddCarForm from "../../pom/forms/addCarForm";

class GaragePage {
    get garageBody() {
        return cy.get('body');
    }
    get addCarButton() {
        return cy.get('.panel-page .btn');
    }
    get garageList() {
        return cy.get('.car-item');
    }
    get addedCarTitle() {
        return cy.get('p.car_name');
    }
    get addedCarMileageDate() {
        return cy.get('.car-body .car_update-mileage');
    }
    get addedCarMileageInput() {
        return cy.get('.update-mileage-form_input');
    }
    get addedCarMileageSaveButton() {
        return cy.get('.update-mileage-form_submit');
    }
    get editCarButton() {
        return cy.get('span.icon.icon-edit').first();
    }
    get expenseCarButton() {
        return cy.get('.button car_add-expense').first();
    }
    openAddCarForm() {
        this.addCarButton.click();
    }
    openEditCarForm() {
        this.editCarButton.click();
    }
    openExpenseCarForm() {
        this.expenseCarButton.click();
    }
    getCarsCount() {
    return this.garageBody.then(($body) => {
      return $body.find('.car-item').length;
    });
  }
   removeAllCars() {
   return this.getCarsCount().then((carsCount) => {
    if (carsCount > 0) {
      for (let i = 0; i < carsCount; i++) {
        this.openEditCarForm();
        EditCarForm.removeCar();
        RemoveCarForm.confirmRemove();
      }
      this.garageList.should("have.length", 0);
    }
  });
}
    addCar(){
      this.openAddCarForm();
      AddCarForm.addCar(1,0,1000);
      AddCarForm.closeAdding();
  }
  validateAddedCarTitle(title) {
    this.addedCarTitle.should("contain.text", title);
  }
  validateAddedCarMileageDate(date) {
    this.addedCarMileageDate.should("contain.text", date);
  }
  validateAddedCarMileageInput(mileage) {
    this.addedCarMileageInput.should("have.value", mileage);
  }
}

export default new GaragePage();