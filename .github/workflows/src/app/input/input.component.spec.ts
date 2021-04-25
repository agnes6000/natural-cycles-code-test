import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InputComponent } from './input.component'

describe('InputComponent', () => {
  let component: InputComponent
  let fixture: ComponentFixture<InputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be defined', () => {
    expect(component).toBeDefined()
  })

  it('should set max font size if short text', () => {
    const MAX_FONT_SIZE = 40
    component.fontSize = 10
    component.containerWidth = 100
    component.textInputString = 'A'
    component['fitText']()
    fixture.detectChanges()
    expect(component.fontSize).toBe(MAX_FONT_SIZE)
  })

  it('should not set max font size if long text', () => {
    const MAX_FONT_SIZE = 40
    component.fontSize = 10
    component.containerWidth = 100
    component.textInputString =
      'A long text that can not be rendered with the maximum font size'
    component['fitText']()
    fixture.detectChanges()
    expect(component.fontSize).not.toBe(MAX_FONT_SIZE)
  })
})
