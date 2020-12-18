import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { HttpService } from "../http.service";
import {HttpErrorResponse} from "@angular/common/http"
import {Location} from "@angular/common";

@Component({

  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  msg;
  id;
  profiles;
  value;
  AttorneyForm: FormGroup;
  error;



  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router:Router,private http: HttpService,private location:Location) {

    this.AttorneyForm = this.fb.group({
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
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      let id = param["id"];
      this.id = parseInt(id);
    })
    this.http.getAllProfiles().subscribe((res) => {
      this.profiles = res;

      this.value = this.profiles.filter((x) => {

        return x.id === this.id

      });
     
      if(this.value.length==0)
      {
        this.navigate();

      }
      else
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



    })



  }

  onSubmit() {
    console.log(this.AttorneyForm.value)
    this.http.updateById(this.id,this.AttorneyForm.value).subscribe((res)=>{
      
      this.msg=res;
      this.navigate()
     
    }),
    (error:HttpErrorResponse)=>{
     
      if (error.error instanceof ErrorEvent) {
        
        console.error('An error occurred:', error.error.message);
        this.error=error.error.message;
        this.navigate()
      } else {
        
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
          this.error= `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`;
          this.navigate()
      }     
    }
 
  }

  navigate()
  {
    this.router.navigateByUrl('/admin');
  }
  goBack()
  {
    this.location.back();
  }

}
