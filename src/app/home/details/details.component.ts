import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  selectedItem: any;

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.selectedItem = this.apiService.setDetails;
  }
}
