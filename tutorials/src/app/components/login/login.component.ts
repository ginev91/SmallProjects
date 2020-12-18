import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service'
import  User  from  '../../models/user'
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  form: FormGroup 

  isLoggedIn = true;
  iSubmitted  = false;
  user:User = new User
  message = '';
 
  constructor(private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder ) { 
    
   
  }

  ngOnInit(): void {
 
    this.form  =  this.formBuilder.group({
      email: [''],
      password: ['']
      
      
  });
  this.isLoggedIn;
  
  }

  get formControl() { return this.form.controls; }



 login(){
   this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value).then(() => {

     this.message = 'You logged in successfully!';
     console.log('Loged in!');
     console.log(this.authService.isLoggedIn)
     this.router.navigateByUrl("/tutorials")
    
   }).catch((err) =>{
      this.message = `You failed to login!!!
      ${err}`;
   
     })
   };
  

}

