import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Tutorial from '../models/tutorial';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private dbPath = '/tutorials';

  tutorialsRef: AngularFireList<Tutorial> = null;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Tutorial> {
    return this.tutorialsRef;
  }
}
  