import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../../services/auth-service.service'
import { User } from  'firebase';

@Component({
  selector: 'app-my-tutorials',
  templateUrl: './my-tutorials.component.html',
  styleUrls: ['./my-tutorials.component.css']
})
export class MyTutorialsComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  currentUser = null;
  author =''
 
  searchByTitles = '';

  constructor(private tutorialService: TutorialService, public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.currentTutorial = null;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
   
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
          
        ).filter(el => el.author == this.authService.user.email)
      )
    ).subscribe(data => {
      
      this.tutorials = data;
  
      
    });

  }


  setActiveTutorial(tutorial, index): void {
    
    this.currentTutorial = tutorial;
    this.currentIndex = index;
    

  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  search(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ).filter(el => el.author == this.authService.user.email).filter(el => el.title.includes(this.searchByTitles) || el.description.includes(this.searchByTitles))
      )
    ).subscribe(data => {
      this.tutorials = data;

      
    })
  }
}

