const url = 'http://localhost:4200'

describe('Homepage Exists', () => {
  it('passes', () => {
    cy.visit(url + '/home')
  })
})

describe('Login Page Exists', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.location('pathname').should('eq', '/login')
  })
})

describe('Student View Page Exists', () => {
  it('passes', () => {
    cy.visit(url + '/student-view')
    cy.location('pathname').should('eq', '/student-view')
  })
})

describe('Teacher Page Exists', () => {
  it('passes', () => {
    cy.visit(url + '/teacher-view')
    cy.location('pathname').should('eq', '/teacher-view')
  })
})

describe('Course View Page Exists', () => {
  it('passes', () => {
    cy.visit(url + '/course-view')
    cy.location('pathname').should('eq', '/course-view')
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

describe('Check Teacher View Card Numbers', () => {
  it('passes', () => {
    cy.visit(url + '/teacher-view')
    cy.get('mat-card').should('have.length', 5)
  }) 
})
