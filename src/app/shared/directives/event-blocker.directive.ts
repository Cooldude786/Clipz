import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent($event: Event) {
    $event.preventDefault()
    // For extra precaution we can also add stopPropagation() to stop bubling but in our it shouldn't be the case
    $event.stopPropagation();
  }

}
