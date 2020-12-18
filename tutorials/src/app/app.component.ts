import { Component } from '@angular/core';
import { AuthServiceService} from './services/auth-service.service'
import { Router } from '@angular/router'
import {User} from 'firebase'




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tutorials';
 
 user: User; 


  constructor(public authService: AuthServiceService, private router: Router){
  }
 
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  

  logout(): void{
    this.authService.logout().then(() => {
      console.log('Logged Out!');
      this.router.navigateByUrl("/login")
      this.authService.isLoggedIn
     
     
    });
    
  }

}
