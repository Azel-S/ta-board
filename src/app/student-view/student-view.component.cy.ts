import { StudentViewComponent } from './student-view.component'
import { createOutputSpy } from 'cypress/angular'

describe('StepperComponent', () => {
    it('mounts', () => {
        cy.mount(StudentViewComponent)
    })
})