import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  @Input() user: User | undefined;

  constructor(private authService: AuthService, private router:Router) { }

  logout(){
    this.authService.logoutUser()
    .then(() => this.router.navigate(['/login']));
  }
}
