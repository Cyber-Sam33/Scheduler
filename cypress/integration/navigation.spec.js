describe("Navigation", () => {

  beforeEach(() => {
    cy.visit("/");

  });

  it("select the Tuesday list item", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});