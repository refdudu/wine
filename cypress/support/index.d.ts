declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: any): Chainable;
  }
}
