import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  userName: string;

  @Input() toggleSidebar: () => void;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.userName = this.userService.getUserName() || '';
  }
}
