describe("Api Tests", () => {

  it("Sign In [/auth/signin]", () => {
    cy.request("POST", "/api/auth/signin", {
      email: "juliyakomeristaya@gmail.com",
      password: "Test12345!",
      remember: false,
    }).then((response) => {
      const token = String(response.headers["set-cookie"]).split(";")[0];
      expect(response.status).to.eq(200);
      expect(token).to.contain("sid");
    });
  });

  context("Garage tests", () => {
    let sid;
    before(() => {
      cy.request("POST", "/api/auth/signin", {
        email: "juliyakomeristaya@gmail.com",
        password: "Test12345!",
        remember: false,
      }).then((response) => {
        sid = String(response.headers["set-cookie"]).split(";")[0];
        expect(response.status).to.eq(200);
        expect(sid).to.contain("sid");
      });
    });

    it("Get All brands [car/brands]", () => {
    cy.request("/api/cars/brands").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");
      expect(response.body).to.be.an("object");
      expect(response.body.data.length).to.eq(5);
    });
  });

    it("Add car to user [/cars]", () => {
      cy.request({
        method: "POST",
        url: "https://qauto.forstudy.space/api/cars",
        body: {
          carBrandId: 1,
          carModelId: 1,
          mileage: 122,
        },
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.status).to.eq("ok");
        expect(response.body).to.be.an("object");
        expect(response.body.data.carBrandId).to.eq(1);
        expect(response.body.data.carModelId).to.eq(1);
        expect(response.body.data.mileage).to.eq(122);
      });
    });

    it("Get car user [/cars]", () => {
      cy.request({
        method: "GET",
        url: "https://qauto.forstudy.space/api/cars",
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");
        expect(response.body).to.be.an("object");
        expect(response.body.data.length).to.be.greaterThan(0);
      });
    });

    it("Update car [/cars]", () => {
      let idCar;
      cy.request({
        method: "GET",
        url: "https://qauto.forstudy.space/api/cars",
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        cy.log(JSON.stringify(response.body.data[0].id));
        idCar = response.body.data[0].id;

        cy.request({
          method: "PUT",
          url: `https://qauto.forstudy.space/api/cars/${idCar}`,
          body: {
            mileage: 123,
          },
          headers: {
            Cookie: sid,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq("ok");
          expect(response.body).to.be.an("object");
          expect(response.body.data.mileage).to.eq(123);
        });
      });
    });

    it("Delete car user [/cars]", () => {
      let idCar;
      cy.request({
        method: "GET",
        url: "https://qauto.forstudy.space/api/cars",
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        cy.log(JSON.stringify(response.body.data[0].id));
        idCar = response.body.data[0].id;

        cy.request({
          method: "DELETE",
          url: `https://qauto.forstudy.space/api/cars/${idCar}`,
          headers: {
            Cookie: sid,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
    after(() => {
        cy.request({
          method: "GET",
          url: "https://qauto.forstudy.space/api/cars",
          headers: {
            Cookie: sid,
          },
        }).then((response) => {
          let carList = response.body.data;
          carList.forEach((car) => {
            cy.request({
              method: "DELETE",
              url: `https://qauto.forstudy.space/api/cars/${car.id}`,
              headers: {
                Cookie: sid,
              },
            }).then((response) => {
              expect(response.status).to.eq(200);
            });
          });
        });
      });
  });
});
