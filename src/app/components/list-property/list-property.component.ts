import { Component, OnInit } from '@angular/core';
import { AppPropertyService } from 'src/app/services/app.property.service';
import { ToastrService } from 'ngx-toastr';
import { AppPrprty } from 'src/app/model/app.property.model';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss']
})
export class ListPropertyComponent implements OnInit {
  page: number = 1;
  properties: AppPrprty[] = [];
  countries: any[] = [];
  showProperty: boolean = false;
  property: AppPrprty = null;

  constructor(private appPropertyService: AppPropertyService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.appPropertyService.getProperties()
      .subscribe(
        data => {
          this.properties = data.data;
        },
        error => {
          this.toaster.error('ERROR', 'Failed to fetch the property details! \n'+error.statusText);
        });
  }

  onRowEditClick(property: AppPrprty) {
    console.log(property);
  }

  onAddPropertyClick() {
    this.showProperty = true;
    this.property = null;
  }
}