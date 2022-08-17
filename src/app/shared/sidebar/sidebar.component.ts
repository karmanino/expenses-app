import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  @Input() nameToDisplay: string = '';

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    console.log(this.authService.user);
  }

  logout(){
    this.authService.logoutUser()
    .then(() => this.router.navigate(['/login']));
  }
}
