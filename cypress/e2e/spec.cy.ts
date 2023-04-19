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

describe('Sign-Up Page Exists', () => {
  it('passes', () => {
    cy.visit(url + '/signup')
    cy.location('pathname').should('eq', '/signup')
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
    cy.contains('Course ID').type('CEN3031');
    cy.contains('Course Code').type('#0000');
    cy.get("button#SubmitS").should('be.visible').click();

    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/student-view')
  })
})

describe('Ask Question Button Exists', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('CEN3031');
    cy.contains('Course Code').type('#0000');
    cy.get("button#SubmitS").should('be.visible').click();

    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/student-view')
    cy.get("button#AskQuestion").should('be.visible').click();
  })
})

describe('Ask Question Field Exists', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('CEN3031');
    cy.contains('Course Code').type('#0000');
    cy.get("button#SubmitS").should('be.visible').click();

    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/student-view')
    cy.get("button#AskQuestion").should('be.visible').click();
    cy.contains('What is your question...?');
  })
})

describe('Student Can submit question', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('CEN3031');
    cy.contains('Course Code').type('#0000');
    cy.get("button#SubmitS").should('be.visible').click();

    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/student-view')
    cy.get("button#AskQuestion").should('be.visible').click();
    cy.contains('What is your question...?').type('When is your birthday?');
    cy.get("button#SubmitQuestion ").should('be.visible').click();
  })
})

describe('Student Can Cancel Question', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('CEN3031');
    cy.contains('Course Code').type('#0000');
    cy.get("button#SubmitS").should('be.visible').click();

    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/student-view')
    cy.get("button#AskQuestion").should('be.visible').click();
    cy.contains('What is your question...?').type('When is your birthday?');
    cy.get("button#CancelQuestion").should('be.visible').click();
  })
})

describe('Verify Submit and Cancel Do Not Exist After Cancelling', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('CEN3031');
    cy.contains('Course Code').type('#0000');
    cy.get("button#SubmitS").should('be.visible').click();

    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/student-view')
    cy.get("button#AskQuestion").should('be.visible').click();
    cy.contains('What is your question...?').type('When is your birthday?');
    cy.get("button#CancelQuestion").should('be.visible').click();
    cy.get("button#CancelQuestion").should('not.exist');
    cy.get("button#SubmitQuestion").should('not.exist');
  })
})

describe('Verify Question Posts after Submission', () => {
  it('passes', () => {
    cy.visit(url + '/login')
    cy.contains('Course ID').type('CEN3031');
    cy.contains('Course Code').type('#0000');
    cy.get("button#SubmitS").should('be.visible').click();

    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/student-view')
    cy.get("button#AskQuestion").should('be.visible').click();
    cy.contains('What is your question...?').type('When is your birthday?');
    cy.get("button#SubmitQuestion").should('be.visible').click();
    cy.contains('When is your birthday?');
  })
})

// describe('Student can Open Syllabus', () => {
//   it('passes', () => {
//     // INFO: Seems that cypress doesn't allow access to two origins.
//     //       Currently we are forcing a visit, need a better solution.
//     cy.visit(url + '/student-view')
//     cy.get("button#syllabusButton").should('be.visible').click();
//   })
// })

// describe('Teacher can Open Syllabus', () => {
//   it('passes', () => {
//     // INFO: Seems that cypress doesn't allow access to two origins.
//     //       Currently we are forcing a visit, need a better solution.
//     cy.visit(url + '/course-view')
//     cy.get("button#syllabusButton").should('be.visible').click();
//   })
// })

describe('Check Teacher View Card Numbers', () => {
  it('passes', () => {
    // INFO: Seems that cypress doesn't allow access to two origins.
    //       Currently we are forcing a visit, need a better solution.
    cy.visit(url + '/teacher-view')
    cy.get('mat-card').should('have.length', 1)
  }) 
})
