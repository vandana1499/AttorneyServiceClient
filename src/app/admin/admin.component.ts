import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { HttpErrorResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms";
import { Location } from "@angular/common"
import { ActivatedRoute, Router } from "@angular/router"

@Component({

  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  profiles;
  distinctCities;
  deleteResponse;
  profilesIsActive;
  CityForm = this.fb.group({
    City: ['']
  })
  deleteError;
  constructor(private http: HttpService, private fb: FormBuilder, private location: Location, private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.profiles = data['data'];

    })
    this.http.getDistinctCities().subscribe((res) => {
      this.distinctCities = res;
      console.log(this.distinctCities)
    })

  }
  onSubmit() {
    let city = this.CityForm.value;
    console.log(city.City);
    if (city.City === "All") {
      this.http.getAllProfiles().subscribe((res) => {
        this.profiles = res;

      })
    }
    else {
      this.http.getAllProfilesByCity(city.City).subscribe((res) => {
        this.profiles = res;
        console.log(this.profiles)
      })
    }
  }

  onDelete(id) {
    this.http.deleteById(id).subscribe(res => {
      this.profiles = res;
    }),
      (error: HttpErrorResponse) => {

        if (error.error instanceof ErrorEvent) {
          this.deleteError = error.error.message;
        }
        else {

          this.deleteError =
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`;

        }




      }
  }

  goBack() {
    this.router.navigateByUrl("/")
  }



}
