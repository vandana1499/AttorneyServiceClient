import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {HttpErrorResponse} from "@angular/common/http"
import {FormBuilder} from "@angular/forms";

@Component({
 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http:HttpService,private fb:FormBuilder) { }
  profiles;
  distinctCities;
  deleteResponse;
  profilesIsActive;
  CityForm=this.fb.group({
    City:['']
  })
  ngOnInit(): void {
    this.http.getAllProfiles().subscribe((res)=>{
      this.profiles=res;
      console.log(this.profiles);
    })
    this.http.getDistinctCities().subscribe((res)=>{
      this.distinctCities=res;
      console.log(this.distinctCities)
    })

  }
  onSubmit()
  {
    let city =this.CityForm.value;
    console.log(city.City);
    if(city.City==="All")
    {
      this.http.getAllProfiles().subscribe((res)=>{
        this.profiles=res;
        
      })
    }
    else
    {
    this.http.getAllProfilesByCity(city.City).subscribe((res)=>{
      this.profiles=res;
      console.log(this.profiles)
    })
  }
  }

  onDelete(id)
  {
    console.log(typeof id);
    this.http.deleteById(id).subscribe(res=>{
      this.profiles=res;
    }),
    (error:HttpErrorResponse)=>{
     
      if (error.error instanceof ErrorEvent) {
        
        console.error('An error occurred:', error.error.message);
      } else {
        
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
        
      }
      
      
      
    
    }
  }
 

}
