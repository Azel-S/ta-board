const url = 'http://localhost:4200'

describe('Homepage Exists', () => {
  it('passes', () => {
    cy.visit(url + '/home')
  })
})

describe('Homepage -> Login Page', () => {
  it('passes', () => {
    cy.visit(url + '/home')
    cy.get("button#login").should('be.visible').click();
    cy.url().should('eq', url + '/login')
  })
})

describe('Student can Login', () => {
  it('Visits Login Page', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('Admin');
    cy.contains('Login').click();
    cy.visit(url + '/student-view')
  })
})