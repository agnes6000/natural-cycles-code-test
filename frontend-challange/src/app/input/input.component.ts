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
  public containerWidth: number =
    Number(localStorage.getItem('containerWidth')) ?? 100
  public fontSize: number = Number(localStorage.getItem('fontSize')) ?? 25

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  public clearValue() {
    this.textInputString = ''
  }

  public onFormChange(value: string) {
    localStorage.setItem('textInputString', value)
    this.fitText()
  }

  public updateRangeSlider(event: MatSliderChange) {
    if (event.value) {
      this.containerWidth = event.value
      localStorage.setItem('containerWidth', String(this.containerWidth))
    }
    if (this.containerWidth) {
      this.fitText()
    }
  }

  public fitText() {
    const MAX_FONT_SIZE = 40
    const SCALE = 3
    let dif = 0
    this.changeDetectorRef.detectChanges()

    let textElement = document.querySelector<HTMLElement>('.textSpan')
    let textWidth = (textElement?.offsetWidth ?? 0) + 20
    if (textWidth) {
      dif = textWidth - this.containerWidth
    }
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
