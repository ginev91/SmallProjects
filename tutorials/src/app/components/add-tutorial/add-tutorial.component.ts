import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import Tutorial  from '../../models/tutorial';
import { User } from 'firebase';
import { AngularFireAuth } from  "@angular/fire/auth";
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
  constructor(private tutorialService: TutorialService ) { 
    
  }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    this.tutorialService.create(this.tutorial).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.archived = false;
  
      
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.archived = false;
    this.tutorial = new Tutorial();
    console.log(this.tutorial)
    
    
  }
}
