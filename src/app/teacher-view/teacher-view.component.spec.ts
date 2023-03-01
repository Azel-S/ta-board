import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatAccordionHarness, MatExpansionPanelHarness} from '@angular/material/expansion/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { TeacherViewComponent } from './teacher-view.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TeacherViewComponent', () => {
  let fixture: ComponentFixture<TeacherViewComponent>;
  let component: TeacherViewComponent;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatExpansionModule, NoopAnimationsModule],
      declarations: [TeacherViewComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TeacherViewComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should be able to load accordion', async () => {
    const accordions = await loader.getAllHarnesses(MatAccordionHarness);
    expect(accordions.length).toBe(1);
  });

  it('should be able to load expansion panels', async () => {
    const panels = await loader.getAllHarnesses(MatExpansionPanelHarness);
    expect(panels.length).toBe(3);
  });

  it('should be able to toggle expansion state of panel', async () => {
    const panel = await loader.getHarness(MatExpansionPanelHarness);
    expect(await panel.isExpanded()).toBe(false);
    await panel.toggle();
    expect(await panel.isExpanded()).toBe(true);
  });
  
  it('should be able to get expansion panels of accordion', async () => {
    const accordion = await loader.getHarness(MatAccordionHarness);
    const panels = await accordion.getExpansionPanels();
    expect(panels.length).toBe(3);
    expect(await panels[0].getTitle()).toBe('Abbas');
  });
});
