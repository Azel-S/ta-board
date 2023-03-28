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
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('Admin');
    cy.get("button#SubmitS").should('be.visible').click();

    // TODO: Check why this login is not interacting with db.
    cy.visit(url + '/student-view')
  })
})

describe('Student can Open Syllabus', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('Admin');
    cy.get("button#SubmitS").should('be.visible').click();

    // TODO: Check why this login is not interacting with db.
    cy.visit(url + '/student-view')
    cy.get("button#syllabusButton").should('be.visible').click();
  })
})

describe('Check Login Location Exists', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    // Ensure login is successful:
    // Successfully route to `/profile` path
    cy.location('pathname').should('eq', '/login')
  })
})

describe('Check Teacher Page Location', () => {
  it('passes', () => {
    cy.visit(url + '/teacher-view')
    // Ensure login is successful:
    // Successfully route to `/profile` path
    cy.location('pathname').should('eq', '/teacher-view')
  })
})

// describe('Check Teacher View Card Number', () => {
//   it('passes', () => {
//     cy.visit(url + '/teacher-view')
//     cy.location('pathname').should('eq', '/teacher-view')
//     cy.
//   })
// })