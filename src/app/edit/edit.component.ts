import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { HttpService } from "../http.service";
import { HttpErrorResponse } from "@angular/common/http"
import { Location } from "@angular/common";
import { Specialization } from "../Specialization"

@Component({

  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  msg;
  id;
  profiles;
  value;
  error;
  Specialization = [];
 
  AttorneyForm: FormGroup;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpService, private location: Location) {


  }

  ngOnInit(): void {
   
    this.route.params.subscribe(param => {
      let id = param["id"];
      this.id = parseInt(id);
    })
    this.route.data.subscribe(data => {
      this.profiles = data['data'];

    })
    this.setSpecs()
    this.AttorneyForm = this.fb.group({
      FirstName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      MiddleName: [''],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email, this.uniqueEmailValidator.bind(this)]],
      Specialization: ['', Validators.required],
      Address: this.fb.group({
        Lane1: ['', Validators.required],
        Lane2: [''],
        State: ['', Validators.required],
        Zip: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
        City: ['', Validators.required]
      })
    })
      this.value = this.profiles.filter(x =>{return x.id === this.id} );

      if (this.value.length == 0) {
        this.navigate();
      }
      else 
      {
        this.updateValue();
      }
  }

  get f() { return this.AttorneyForm.controls; }
  updateValue()
  {
    this.AttorneyForm.patchValue({
      FirstName: this.value[0].firstName,
      MiddleName: this.value[0].middleName,
      LastName: this.value[0].lastName,
      Email: this.value[0].email,
      Specialization: this.value[0].specialization,
      Address: {
        Lane1: this.value[0].address.lane1,
        Lane2: this.value[0].address.lane2,
        State: this.value[0].address.state,
        Zip: this.value[0].address.zip,
        City: this.value[0].address.city
      }
    })
  }
  onSubmit() {
   
    console.log(this.AttorneyForm.value)
    this.http.updateById(this.id, this.AttorneyForm.value).subscribe((res) => {
      console.log("res--------");
      console.log(res)
      this.msg = res;

    }),
      (error: HttpErrorResponse) => {

        if (error.error instanceof ErrorEvent) {

          console.error('An error occurred:', error.error.message);
          this.error = error.error.message;

        } else {

          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
          this.error = `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`;

        }
        this.error = 'Something bad happened; please try again later.';

      }

  }

  navigate() {
    this.router.navigateByUrl('/admin');
  }
  goBack() {
    this.router.navigateByUrl('/admin');
  }
  setSpecs() {
    let spec = Specialization;

    for (let item in spec) {
      if (isNaN(Number(item))) {
        this.Specialization.push(item);
      }
    }
  }
  profile(val: any): boolean {

    let check = 0;
    this.profiles.forEach(element => {
      if (element.email === val) {

        check = 1;
      }
    });
    if (check == 1)
      return true;
    return false;

  }
  uniqueEmailValidator(control: AbstractControl): any {
    if (this.profile(control.value)) {
      return { 'uniqueEmail': true }
    }
    return null;
  }
}
