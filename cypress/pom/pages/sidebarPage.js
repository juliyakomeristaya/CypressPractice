class SidebarPage {
    get routerLinkGarage() {
        return cy.get('a[routerlink="garage"]');
    }
    get routerLinkExpenses() {
        return cy.get('a[routerlink="expenses"]');
    }
    get routerLinkInstructions() {
        return cy.get('a[routerlink="instructions"]');
    }

    routeGarage() {
        this.routerLinkGarage.click();
    }
    routeExpenses() {
        this.routerLinkExpenses.click();
    }
    routeInstructions() {
        this.routerLinkInstructions.click();
    }
}

export default new SidebarPage();