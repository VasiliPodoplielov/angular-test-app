import { Component,  } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  sidebarVisible: boolean = true;

  constructor() {
  }

  toggleSideBar(): void {
    console.log(this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
  }
}
