import React from "react";
import { Pagination } from ".";
describe("<Pagination />", () => {
  let pageIndex = 1;
  const total = 5;
  const clickNextButton = () =>
    new Cypress.Promise((resolve) => {
      cy.get("button").contains("próximo").click().then(resolve);
    });
  const clickPreviousButton = () =>
    new Cypress.Promise((resolve) => {
      cy.get("button").contains("anterior").click().then(resolve);
    });
  function remountPagination() {
    cy.mount(
      <Pagination
        changePageIndex={(_pageIndex) => {
          pageIndex = _pageIndex;
        }}
        current={pageIndex}
        total={total}
      />
    );
  }
  beforeEach(() => {
    pageIndex = 1;
    remountPagination();
  });
  it("avançar de página", async () => {
    const expectValue = pageIndex + 1;
    await clickNextButton();
    remountPagination();
    expect(pageIndex).to.equal(expectValue);
    cy.get("button").contains("próximo").should("exist");
    cy.get("button").contains("anterior").should("exist");
  });
  it("voltar uma página", async () => {
    pageIndex = total;
    remountPagination();
    await clickPreviousButton();
    remountPagination();
    expect(pageIndex).to.equal(total - 1);
    cy.get("button").contains("próximo").should("exist");
    cy.get("button").contains("anterior").should("exist");
  });
  it("ir para a última página", async () => {
    const array = Array.from({ length: total - 1 });
    for (const _ of array) {
      await clickNextButton();
      remountPagination();
    }
    cy.get("span").contains(total).should("exist");
    expect(pageIndex).to.equal(total);
    cy.get("button").contains("próximo").should("not.exist");
    cy.get("button").contains("anterior").should("exist");
  });
  it("voltar para a primeira página", async () => {
    pageIndex = 5;
    remountPagination();
    const array = Array.from({ length: total - 1 });
    for (const _ of array) {
      await clickPreviousButton();
      remountPagination();
    }
    cy.get("span").contains(1).should("exist");
    expect(pageIndex).to.equal(1);
    cy.get("button").contains("próximo").should("exist");
    cy.get("button").contains("anterior").should("not.exist");
  });
});
