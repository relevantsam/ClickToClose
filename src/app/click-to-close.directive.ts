import { Directive, ElementRef, Output, OnInit, HostListener, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickToClose]'
})
export class ClickToCloseDirective implements OnInit {
  private status: boolean; // our status checker for our thing

  @Output()
  statusUpdate: EventEmitter<boolean> = new EventEmitter(); // something to talk to our caller

  @HostListener('click', ['$event']) // let's do something when someone clicks this
  onClick(e: MouseEvent) {
    this.status = !this.status; // toggle this bad hambre
    this.statusUpdate.emit(this.status); // let the caller know what we did so they can take care of stuff
    if (this.status) { // if we just turned it on, let's do some stuff
      e.stopPropagation(); // we're about to mess with this event, let's not let the browser do weird stuff with it
      const removeRegisteredListener = this.renderer.listen('document', 'click', (ev) => { // Do this next time the user clicks anywhere
        if(ev.target !== e.target && !this.el.nativeElement.contains(ev.target)) { // Check we're not clicking our item
          this.status = false; // if this function is getting called, we know status is true, so turn it off
          this.statusUpdate.emit(this.status); // let the parent handle that
          removeRegisteredListener(); // kill this listener because leaks are bad and we hate leaks
        }
      });
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { } // bring in the element and the renderer

  ngOnInit() {
    this.status = false; // default the status to false
  }
}