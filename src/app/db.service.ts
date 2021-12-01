import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mount } from './Mount';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  mountList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.storage = db;
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS MOUNTSTABLE(id INTEGER PRIMARY KEY AUTOINCREMENT, mount_id INTEGER, name VARCHAR(30), description TEXT, enhanced_description TEXT, tooltip TEXT, movement VARCHAR(20), seats INTEGER, owned VARCHAR(4), image TEXT, icon TEXT)`, []).then(() => {
          this.loadMounts();
          this.isDbReady.next(true);
        }).catch(e => console.log(e));
      }).catch(e => console.log(e));
    })
  }

  getDatabaseState() {
    return this.isDbReady.asObservable();
  }

  getMounts(){
    return this.mountList.asObservable();
  }

  loadMounts() {
    return this.storage.executeSql(`SELECT * FROM MOUNTSTABLE`, []).then(res => {
      let mounts: Mount[] = [];

      for(let i = 0; i < res.rows.length; i++){
        mounts.push({
          id: res.row.item(i).mount_id,
          name: res.row.item(i).name,
          desc: res.row.item(i).description,
          enh_desc: res.row.item(i).enhanced_description,
          tooltip: res.row.item(i).tooltip,
          movement: res.row.item(i).movement,
          seats: res.row.item(i).seats,
          owned: res.row.item(i).owned,
          image: res.row.item(i).image,
          icon: res.row.item(i).icon
        });
      }
      this.mountList.next(mounts);
      console.log(this.mountList);
    }).catch(e=>console.log(e));
  }

  addMount(id, name, desc, enh_desc, tooltip, movement, seats, owned, image, icon){
    console.log("addMount()");
    let data = [id, name, desc, enh_desc, tooltip, movement, seats, owned, image, icon];
    return this.storage.executeSql(`INSERT INTO MOUNTSTABLE(mount_id, name, description, enhanced_description, tooltip, movement, seats, owned, image, icon) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data).then(res => {
      this.loadMounts();
      return res.insertID;
    }).catch(e=>console.log(e));
  }

  deleteMountByID(id: number){
    return this.storage.executeSql(`DELETE FROM MOUNTSTABLE WHERE mount_id=?`, [id]).then(res =>{
      this.loadMounts();
    }).catch(e=>console.log(e));
  }
}