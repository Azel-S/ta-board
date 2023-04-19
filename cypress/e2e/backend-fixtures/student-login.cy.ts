describe('Student Can Login (CEN3031)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("CEN3031");
    cy.contains("Course Code").type("#0000");

    cy.fixture('Courses/John').then((res) => {
      cy.intercept('POST', '/Student', res[0]).as('Student');
    })

    cy.fixture('Questions/CEN3031').then((res) => {
      cy.intercept('POST', '/GetQuestions', res[0]).as('GetQuestions');
    })

    cy.get("button#SubmitS").should('be.visible').click();

    cy.wait('@Student');
    cy.wait('@GetQuestions');
  })
})

describe('Student Can Login (COP4600)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("COP4600");
    cy.contains("Course Code").type("#0003");

    cy.fixture('Courses/John').then((res) => {
      cy.intercept('POST', '/Student', res[1]).as('Student');
    })

    cy.fixture('Questions/COP4600').then((res) => {
      cy.intercept('POST', '/GetQuestions', res).as('GetQuestions');
    })

    cy.get("button#SubmitS").should('be.visible').click();

    cy.wait('@Student');
    cy.wait('@GetQuestions');
  })
})

describe('Student Can Login (JOHN1001)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("JOHN1001");
    cy.contains("Course Code").type("#0002");

    cy.fixture('Courses/John').then((res) => {
      cy.intercept('POST', '/Student', res[2]).as('Student');
    })

    cy.fixture('Questions/JOHN1001').then((res) => {
      cy.intercept('POST', '/GetQuestions', res).as('GetQuestions');
    })

    cy.get("button#SubmitS").should('be.visible').click();

    cy.wait('@Student');
    cy.wait('@GetQuestions');
  })
})

describe('Student Can Login (JANE1001)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("JANE1001");
    cy.contains("Course Code").type("#0001");

    cy.fixture('Courses/Jane').then((res) => {
      cy.intercept('POST', '/Student', res[0]).as('Student');
    })

    cy.fixture('Questions/JANE1001').then((res) => {
      cy.intercept('POST', '/GetQuestions', res).as('GetQuestions');
    })

    cy.get("button#SubmitS").should('be.visible').click();

    cy.wait('@Student');
    cy.wait('@GetQuestions');
  })
})

describe('Student Can Login (LEI2818)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("LEI2818");
    cy.contains("Course Code").type("#1003");

    cy.fixture('Courses/Jane').then((res) => {
      cy.intercept('POST', '/Student', res[1]).as('Student');
    })

    cy.fixture('Questions/LEI2818').then((res) => {
      cy.intercept('POST', '/GetQuestions', res).as('GetQuestions');
    })

    cy.get("button#SubmitS").should('be.visible').click();

    cy.wait('@Student');
    cy.wait('@GetQuestions');
  })
})

describe('Student Can Login (FOS2001)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("FOS2001");
    cy.contains("Course Code").type("#0022");

    cy.fixture('Courses/Jane').then((res) => {
      cy.intercept('POST', '/Student', res[2]).as('Student');
    })

    cy.fixture('Questions/FOS2001').then((res) => {
      cy.intercept('POST', '/GetQuestions', res).as('GetQuestions');
    })

    cy.get("button#SubmitS").should('be.visible').click();

    cy.wait('@Student');
    cy.wait('@GetQuestions');
  })
})

describe('Student Can Login (JAY2004)', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.contains("Course ID").type("JAY2004");
    cy.contains("Course Code").type("#4004");

    cy.fixture('Courses/Jay').then((res) => {
      cy.intercept('POST', '/Student', res[0]).as('Student');
    })

    cy.fixture('Questions/JAY2004').then((res) => {
      cy.intercept('POST', '/GetQuestions', res).as('GetQuestions');
    })

    cy.get("button#SubmitS").should('be.visible').click();

    cy.wait('@Student');
    cy.wait('@GetQuestions');
  })
})