import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { MatSliderChange } from '@angular/material/slider'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  public textInputString: string = ''
  public containerWidth: number = 300
  public fontSize: number = 25
  public a: number = 0

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public clearValue() {
    this.textInputString = ''
  }

  public onFormChange(value: string) {
    this.fitText()
  }

  public updateRange(event: MatSliderChange) {
    if (event.value) {
      this.containerWidth = event.value
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

    this.fontSize = Math.min(
      Math.max(this.fontSize - (SCALE * dif) / this.textInputString.length, 0),
      MAX_FONT_SIZE,
    )
  }
}
