import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import Tutorial from '../../models/tutorial';
import { User } from 'firebase';
import { AngularFireAuth } from  "@angular/fire/auth";
import { AuthServiceService } from '../../services/auth-service.service'

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() tutorial: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = null;
  message = '';
  publisher: User
  archived = false;
  pending: boolean
  

  constructor(private tutorialService: TutorialService,public  afAuth: AngularFireAuth, private authService: AuthServiceService) { 
    
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.publisher = user;
        localStorage.getItem('user');
      } else {
        return;
      }
    })
  }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status): void {
    this.tutorialService.update(this.currentTutorial.key, { published: status ,author: this.publisher.email })
      .then(() => {
        this.currentTutorial.published = status;
        this.pending = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };

    this.tutorialService.update(this.currentTutorial.key, data)
      .then(() => this.message = 'The tutorial was updated successfully!')
      .catch(err => console.log(err));
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.key)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The tutorial was updated successfully!';
      })
      .catch(err => console.log(err));
  }

  
  archiveTutorial(status): void {
    this.tutorialService.update(this.currentTutorial.key, { archived: status })
      .then(() => {
        
        this.currentTutorial.archived = status;
       
        this.currentTutorial.author = this.authService.user.email;
        this.message = 'The tutorial was archived successfully!';
        status = false
        this.currentTutorial.published = status
      })
      .catch(err => console.log(err));
  }
}
