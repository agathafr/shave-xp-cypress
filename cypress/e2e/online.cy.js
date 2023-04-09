describe('app', () => {
  it('deve estar online', () => {
    cy.visit(`${Cypress.env('app_web_url')}`)
  })
})