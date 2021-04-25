import { ChangeDetectorRef, Component } from '@angular/core'
import { MatSliderChange } from '@angular/material/slider'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public textInputString: string | null =
    localStorage.getItem('textInputString') ?? ''
  public containerWidth: number = localStorage.getItem('containerWidth')
    ? Number(localStorage.getItem('containerWidth'))
    : 100
  public fontSize: number = Number(localStorage.getItem('fontSize')) ?? 25

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  public clearValue() {
    this.textInputString = ''
  }

  public onFormChange(value: string) {
    localStorage.setItem('textInputString', value)
    this.fitText('.output-div')
  }

  public updateRangeSlider(event: MatSliderChange) {
    if (event.value) {
      this.containerWidth = event.value
      localStorage.setItem('containerWidth', String(this.containerWidth))
    }
    this.fitText('.output-div')
  }

  private fitText(elementSelector: string) {
    const MAX_FONT_SIZE = 40
    const SCALE = 3

    this.changeDetectorRef.detectChanges()

    const TEXT_ELEMENT = document.querySelector<HTMLElement>('.textSpan')
    const TEXT_WIDTH = (TEXT_ELEMENT?.offsetWidth ?? 0) + 20
    const ACTUAL_CONTAINER_WIDTH =
      document.querySelector<HTMLElement>(elementSelector)?.offsetWidth ?? 0
    const dif = TEXT_WIDTH - ACTUAL_CONTAINER_WIDTH

    if (this.textInputString) {
      this.fontSize = Math.min(
        Math.max(
          this.fontSize - (SCALE * dif) / this.textInputString.length,
          0,
        ),
        MAX_FONT_SIZE,
      )
    }
    localStorage.setItem('fontSize', String(this.fontSize))
  }
}
