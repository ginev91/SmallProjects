import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  searchByTitles = '';

  constructor(private tutorialService: TutorialService) { }

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
        ).filter(el => !el.archived)
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
          ).filter(el => !el.archived).filter(el => el.title.includes(this.searchByTitles) || el.description.includes(this.searchByTitles))
        )
      ).subscribe(data => {
        this.tutorials = data;
      })
    }
  
}

