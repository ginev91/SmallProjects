import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service'
import  User  from  '../../models/user'
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms'



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

title = 'Register';
  form: FormGroup 

  isLoggedIn = false;
  iSubmitted  = false;
user:User = new User
 
  constructor(private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder ) { 
    
    
  }

  ngOnInit(): void {
 
    this.form  =  this.formBuilder.group({
      email: [''],
      password: ['']
      
  });
 
  

  }

  get formControl() { return this.form.controls; }


 register(): void{
   
   this.authService.register(this.form.controls['email'].value, this.form.controls['password'].value).then(() => {
     console.log('Registeered!');
     
     this.router.navigateByUrl("/login")
    
   });
   
 }
}


