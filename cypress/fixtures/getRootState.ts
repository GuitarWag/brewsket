export default function getRootState(): Cypress.Chainable {
  return cy.window().its('store').invoke('getState');
}
