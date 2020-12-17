import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {HttpService} from "../http.service";
import { HttpErrorResponse, HttpResponse,} from '@angular/common/http';
import {throwError} from "rxjs";

@Component({

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
msg="";

AttorneyForm=this.fb.group({
  FirstName : ['',Validators.required],
  MiddleName : [''],
  LastName : ['',Validators.required],
  Email :  ['',[Validators.required,Validators.email]],
  Specialization: ['',Validators.required],
  Address:this.fb.group({
    Lane1 :  ['',Validators.required],
    Lane2 :  [''],
    State :  ['',Validators.required],
    Zip   :  ['',[Validators.required,Validators.pattern("^[0-9]{6}$")]],
    City: ['',Validators.required]
  })
 
})
 

  constructor(private fb:FormBuilder,private http:HttpService) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
   
    console.log(this.AttorneyForm.value);
    var val=this.AttorneyForm.get("Specialization").value;
    this.AttorneyForm.patchValue({
      Specialization:parseInt(val),
    });
    this.http.createProfile(this.AttorneyForm.value).subscribe(res=>{
     
      this.AttorneyForm.reset();
      this.msg="Sucessfully submitted"
     
    }),
    (error:HttpErrorResponse)=>{
     
      if (error.error instanceof ErrorEvent) {
        
        console.error('An error occurred:', error.error.message);
        this.msg=error.error.message;
      } else {
        
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
          this.msg= `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`;
      }     
        this.msg='Something bad happened; please try again later.';
    }
  }

}
