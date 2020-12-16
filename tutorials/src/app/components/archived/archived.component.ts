import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  arc = true;

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
        )
      )
    ).subscribe(data => {
  
      this.tutorials = data;

      data = data.filter(arc => arc.archived = "true")
      console.log(data)
      
    });
    
  }

  setActiveTutorial(tutorial, index): void {
    
    this.currentTutorial = tutorial;
  
    this.currentIndex = index;
    console.log(tutorial,index)
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
