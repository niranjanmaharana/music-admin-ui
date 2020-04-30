import { Component, OnInit, Input } from '@angular/core';
import { AppPrprty } from 'src/app/model/app.property.model';
import { AppPropertyService } from 'src/app/services/app.property.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  @Input("show") show: boolean;
  @Input("property") property: AppPrprty;
  loading: boolean = false;
  constructor(private appPropertyService: AppPropertyService, private toaster: ToastrService) { }

  ngOnInit() {
    console.log(this.property);
  }
}