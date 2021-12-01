import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MountService } from '../mount.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchName: string;
  results: Observable<any>;
  constructor(private httpService: MountService) { }

  ngOnInit() {

  }

  searchForMount(){
    this.results = this.httpService.searchData(this.searchName);
  }

}
