import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DbService } from '../db.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favList: any[] = [];
  constructor(private db: DbService, private alertController: AlertController) { }

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

  async remove(id: number, name: string){
    const alert = await this.alertController.create({
      header: 'Warning',
      message: `Do you want to delete ${name} form your list?`,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.db.deleteMountByID(id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
}
