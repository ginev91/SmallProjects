import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import Tutorial  from '../../models/tutorial';
import { User } from 'firebase';
import { AngularFireAuth } from  "@angular/fire/auth";
import { AuthServiceService } from '../../services/auth-service.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {


  title = 'Add Tutorial';
  tutorial: Tutorial = new Tutorial();
  submitted = false;
  archived = false;
  
 
  constructor(private tutorialService: TutorialService , private authService: AuthServiceService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    this.submitted = false;
    this.archived = false;
    this.tutorial.author = this.authService.user.email
    this.tutorialService.create(this.tutorial).then(() => {
      console.log('Created new item successfully!');
      this.router.navigateByUrl("/my-tutorials")
  
      
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.archived = false;
    this.tutorial.author = this.authService.user.email
    this.tutorial = new Tutorial();
    this.router.navigateByUrl("/my-tutorials")
    
  }
}
