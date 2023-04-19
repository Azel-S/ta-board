describe('Teacher Can Login (John)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Teacher").click()

    cy.contains("Username").type("John");
    cy.contains("Password").type("John");

    cy.fixture('Users').then((res) => {
      cy.intercept('POST', '/Teacher', res[0]).as('Teacher');
    })

    cy.fixture('Courses/John').then((res) => {
      cy.intercept('POST', '/GetCourses', res).as('GetCourses');
    })

    cy.get("button#SubmitT").should('be.visible').click();

    cy.wait('@Teacher');
    cy.wait('@GetCourses');
  })
})

describe('Teacher Can Login (Jane)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Teacher").click()

    cy.contains("Username").type("Jane");
    cy.contains("Password").type("Jane");

    cy.fixture('Users').then((res) => {
      cy.intercept('POST', '/Teacher', res[1]).as('Teacher');
    })

    cy.fixture('Courses/Jane').then((res) => {
      cy.intercept('POST', '/GetCourses', res).as('GetCourses');
    })

    cy.get("button#SubmitT").should('be.visible').click();

    cy.wait('@Teacher');
    cy.wait('@GetCourses');
  })
})

describe('Teacher Can Login (Jay)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Teacher").click()

    cy.contains("Username").type("Jay");
    cy.contains("Password").type("Jay");

    cy.fixture('Users').then((res) => {
      cy.intercept('POST', '/Teacher', res[2]).as('Teacher');
    })

    cy.fixture('Courses/Jay').then((res) => {
      cy.intercept('POST', '/GetCourses', res).as('GetCourses');
    })

    cy.get("button#SubmitT").should('be.visible').click();

    cy.wait('@Teacher');
    cy.wait('@GetCourses');
  })
})