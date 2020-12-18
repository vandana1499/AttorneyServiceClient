import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "./http.service"
import {Profile} from "./Profile"

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<Profile[]> {
  
  constructor(private http:HttpService){}
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile[]>|Promise<any>|any {
    
    return this.http.getAllProfiles(); 
  }

}
