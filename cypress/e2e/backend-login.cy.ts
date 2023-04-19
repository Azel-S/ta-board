describe('Student Can Login', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("CEN3031");
    cy.contains("Course Code").type("#0000");

    cy.intercept('POST', '/Student', {
      course_serial: 1,
      user_serial: 1,
      course_id: 'CEN3031',
      course_code: '#0000',
      course_name: 'Software Engineering',
      professor_name: 'John Doe',
      description: 'This course goes over the fundamentals of programming in the real world.'
    }).as('Student')

    cy.intercept('POST', '/GetQuestions', {}).as(
      'GetQuestions'
    )

    cy.get("button#SubmitS").should('be.visible').click();
    cy.wait(4000) // <--- this is unnecessary

  })
})