import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable,throwError} from "rxjs";
import {catchError,retry} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  Url="https://localhost:44322/attorney-registration/"

  constructor(private http:HttpClient) { }

  createProfile(data)
  {
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type','application/json;charset=utf-8');
   
  
    return this.http.post("https://localhost:44322/attorney-registration/create-profile",
          JSON.stringify(data),
          {headers:headers}
    );
  }
}
