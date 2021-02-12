import {
  Component,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"]
})
export class DrawerComponent {
  @ViewChild("closeref", { static: false })
  closeTarget: ElementRef<HTMLElement>;
  @ViewChild("drawer", { static: false })
  drawerTarget: ElementRef<HTMLElement>;

  @Input() title: string;
  constructor(private renderer: Renderer2) {}

  @HostListener("click", ["$event"])
  hostClick(event: MouseEvent) {
    if (this.closeTarget.nativeElement === event.target) {
      this.close();
    }
  }

  close() {
    this.renderer.removeClass(this.drawerTarget.nativeElement, "open");
    setTimeout(
      () => this.renderer.addClass(this.closeTarget.nativeElement, "hidden"),
      250
    );
  }

  open() {
    this.renderer.removeClass(this.closeTarget.nativeElement, "hidden");
    setTimeout(() => {
      this.renderer.addClass(this.drawerTarget.nativeElement, "open");
    }, 5);
  }
}
