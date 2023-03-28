import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentViewComponent } from './student-view.component';

describe('StudentView', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: []
    }));

    it('StudentView mounts', () => {
        cy.mount(StudentViewComponent);
    });
});