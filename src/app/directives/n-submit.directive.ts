import {Directive, ElementRef, HostListener} from '@angular/core';

const DISABLE_TIME = 300;
@Directive({
  selector: 'button[n-submit]',
  standalone: true
})
export class DisableButtonOnSubmitDirective {
  constructor(private elementRef: ElementRef) { }
  @HostListener('click', ['$event'])
  clickEvent() {
    this.elementRef.nativeElement.setAttribute('disabled', 'true');
    setTimeout(() => this.elementRef?.nativeElement?.removeAttribute('disabled'), DISABLE_TIME);
  }
}
