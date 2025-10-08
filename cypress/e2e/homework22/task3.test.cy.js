describe("Api Tests Plagin", () => {
  it("Get All brands [car/brands]", () => {
     cy.api("GET", "https://qauto.forstudy.space/api/cars/brands").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");
      expect(response.body).to.be.an("object");
      expect(response.body.data.length).to.eq(5);
 });
});
  it("Get All models [car/models]", () => {
     cy.api("GET", "https://qauto.forstudy.space/api/cars/models").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");
      expect(response.body).to.be.an("object");
      expect(response.body.data.length).to.eq(23);
 });
});
});
