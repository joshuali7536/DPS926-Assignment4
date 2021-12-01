import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';
import { MountService } from '../mount.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  mountInfo: any;
  constructor(private activatedRoute: ActivatedRoute, private mountService: MountService, private db: DbService, private alertController: AlertController) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.mountService.getDetails(id).subscribe(data => this.mountInfo = data);
  }

  addToFavourites(){
    //console.log("addToFavourites()" + this.mountInfo.name);

    this.db.addMount(this.mountInfo.id, this.mountInfo.name, this.mountInfo.description, this.mountInfo.enhanced_description, this.mountInfo.tooltip, this.mountInfo.movement, this.mountInfo.seats, this.mountInfo.owned, this.mountInfo.image, this.mountInfo.icon);
    this.presentAlert("Mount Favourited", "Added " + this.mountInfo.name + " to favourites.");
  }

  async presentAlert(title:string, msg:string){
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK']
    })
    await alert.present();
  }
}
