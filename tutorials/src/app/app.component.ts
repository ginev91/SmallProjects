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
 
 isLoggedIn:boolean;
 user: User; 

  constructor(private authService: AuthServiceService, private router: Router){
   if(this.authService.user = undefined){
     this.isLoggedIn = false;
   }else{
     this.isLoggedIn = true;
   }
  }
 


  logout(): void{
    this.authService.logout().then(() => {
      console.log('Logged Out!');
      this.isLoggedIn = false;
      this.router.navigateByUrl("/login")
      console.log(this.isLoggedIn)
     
    });
    
  }

}
