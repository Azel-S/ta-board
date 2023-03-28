describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:60163/login')

    cy.contains('Student').type('admin');
    cy.contains('Login').click();
    cy.visit('http://localhost:60163/student-view')
  })
})