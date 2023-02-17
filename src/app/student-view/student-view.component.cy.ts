import { StudentViewComponent } from './student-view.component'
import { createOutputSpy } from 'cypress/angular'

describe('StepperComponent', () => {
    it('mounts', () => {
        cy.mount(StudentViewComponent)
    })

    it('supports an "initial" prop to set the value', () => {
        cy.mount(StudentViewComponent, {
            componentProperties: {
                count: 100,
            },
        })
        cy.get('[data-cy=counter]').should('have.text', '100')
    })

    it('counter should default to 0', () => {
        cy.mount(StudentViewComponent)
        cy.get('[data-cy=counter]').should('have.text', '0')
    })

    it('when the increment button is pressed, the counter is incremented', () => {
        cy.mount(StudentViewComponent)
        cy.get('[data-cy=increment]').click()
        cy.get('[data-cy=counter]').should('have.text', '1')
    })

    it('when the decrement button is pressed, the counter is decremented', () => {
        cy.mount(StudentViewComponent)
        cy.get('[data-cy=decrement]').click()
        cy.get('[data-cy=counter]').should('have.text', '-1')
    })

    it('clicking + fires a change event with the incremented value', () => {
        cy.mount(StudentViewComponent, {
            componentProperties: {
                change: createOutputSpy('changeSpy'),
            },
        })
        cy.get('[data-cy=increment]').click()
        cy.get('@changeSpy').should('have.been.calledWith', 1)
    })
})

// Source: https://docs.cypress.io/guides/component-testing/angular/quickstart