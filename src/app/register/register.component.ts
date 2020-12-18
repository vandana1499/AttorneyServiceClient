import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpService } from "../http.service";
import { HttpErrorResponse, HttpResponse, } from '@angular/common/http';
import { Location } from "@angular/common"
import { Specialization } from "../Specialization"

@Component({

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  msg = "";
  errors;
  Specialization = [];
  isSubmitted=false

  AttorneyForm = this.fb.group({
    FirstName: ['', Validators.required],
    MiddleName: [''],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Specialization: ['', Validators.required],
    Address: this.fb.group({
      Lane1: ['', Validators.required],
      Lane2: [''],
      State: ['', Validators.required],
      Zip: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      City: ['', Validators.required]
    })

  })


  constructor(private fb: FormBuilder, private http: HttpService, private location: Location) { }

  ngOnInit(): void {
    this.setSpecs()

  }

  get f() { return this.AttorneyForm.controls; }

  onSubmit() {
    this.isSubmitted=true;
   
   
    if (this.AttorneyForm.valid) {
      var val = this.AttorneyForm.get("Specialization").value;
      if(!isNaN(val))
      {
        this.AttorneyForm.patchValue({
          Specialization: parseInt(val),
        });
      }
      this.http.createProfile(this.AttorneyForm.value).subscribe(res => {
        console.log(this.AttorneyForm.value)
        this.msg = "Sucessfully submitted"
        this.AttorneyForm.reset();

      }),
        (error: HttpErrorResponse) => {

          if (error.error instanceof ErrorEvent) {

            console.error('An error occurred:', error.error.message);
            this.errors = error.error.message;
          } else {

            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
            this.errors = `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`;
          }
          this.errors = 'Something bad happened; please try again later.';
        }
    }
    else {

      this.errors = "Kindly validate the form before submission"
    }
  }
  goBack() {
    this.location.back();
  }
  setSpecs() {
    let spec = Specialization;

    for (let item in spec) {
      if (isNaN(Number(item))) {
        this.Specialization.push(item);
      }
    }
  }


}
