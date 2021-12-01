import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../db.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favList: any[] = [];
  constructor(private db: DbService, private route: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.db.getMounts().subscribe(mounts => {
          this.favList = mounts;
        });
      }
    });
    console.log(this.favList);
  }

  remove(id: number){
    console.log("removing " + id);
    this.db.deleteMountByID(id);
  }
}
