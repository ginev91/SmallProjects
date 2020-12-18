import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { ArchiveService } from '../../services/archive.service';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../../services/auth-service.service'



@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {

  tutorials: any;
  tutorialsArc: any;
  currentTutorial: TutorialService;
  currentIndex = -1;
  title = '';
  arc: "";
  searchByTitles = '';

  constructor(private tutorialService: TutorialService, private arcService: ArchiveService ,private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.currentTutorial = null;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.arcService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ).filter(el => el.archived)
      )
    ).subscribe(data => {
     this.tutorialsArc = data      
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
    this.arcService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ).filter(el => el.archived).filter(el => el.title.includes(this.searchByTitles) || el.description.includes(this.searchByTitles))
      )
    ).subscribe(data => {
      this.tutorialsArc = data;
     
      
    })
  }
}
