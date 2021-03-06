import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {

    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

   }

   async login(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['tutorials']);
   
    

``
  }

  async register(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    this.router.navigate(['tutorials-list']);
}

async logout(){
  await this.afAuth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['tutorials']);

}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}

}
