import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MountService {
  url = 'https://ffxivcollect.com/api/mounts?name_en_cont=';
  detailsURL = 'https://ffxivcollect.com/api/mounts/';

  constructor(private http: HttpClient) { }

  searchData(name: string){
    var fullUrl = this.url + name;
    return this.http.get(fullUrl).pipe(map(data => data['results']));
  }

  getDetails(id: string){
    return this.http.get(this.detailsURL + id);
  }
}
