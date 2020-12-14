import { Component } from '@angular/core';
import { AuthServiceService} from './services/auth-service.service'
import { Router } from '@angular/router'
import User from './models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tutorials';
 

  constructor(private authService: AuthServiceService, private router: Router){

  }
  logout(): void{
    this.authService.logout().then(() => {
      console.log('Logged Out!');
      this.router.navigateByUrl("/login")
     
    });
    
  }

}
