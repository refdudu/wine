describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const nextPage = () =>
    new Cypress.Promise((resolve) =>
      cy.getBySel("next-page").click().then(resolve)
    );
  const filterBetweenPrice0_40 = () =>
    new Cypress.Promise((resolve) =>
      cy
        .get('[data-cy="between-prices-filter"] > div')
        .contains("Até R$40")
        .click()
        .then(resolve)
    );
  const clearFilter = () =>
    new Cypress.Promise((resolve) =>
      cy.getBySel("clear-between-prices-filter").click().then(resolve)
    );

  it("ir para a próxima página e filtrar os items", async () => {
    cy.viewport(1280, 760)
    const getFirstProductName: () => Promise<string> = () =>
      new Cypress.Promise((resolve) => {
        cy.getBySel("product-card-name").first().invoke("text").then(resolve);
      });
    let productName = await getFirstProductName();

    await nextPage();
    cy.wait(1000); // wait request
    let newProductName = await getFirstProductName();
    expect(productName).not.to.equal(newProductName);
    productName = newProductName;

    await filterBetweenPrice0_40();
    cy.wait(1000); // wait request
    newProductName = await getFirstProductName();
    ("");
    expect(productName).not.to.equal(newProductName);
    productName = newProductName;

    await clearFilter();
    cy.wait(1000); // wait request
    newProductName = await getFirstProductName();
    expect(productName).not.to.equal(newProductName);
  });
});
