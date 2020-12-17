import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";




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
  getAllProfiles()
  {
    return this.http.get("https://localhost:44322/attorney-registration/getAllProfiles");
  }
  getAllProfilesByCity(city)
  {
    
    return this.http.get("https://localhost:44322/attorney-registration/getAllProfiles/"+city);
  }
  getDistinctCities()
  {
    return this.http.get("https://localhost:44322/attorney-registration/getAllProfilesByDistinctCity");
  }
  deleteById(id)
  {
    return this.http.delete("https://localhost:44322/attorney-registration/delete-profile/"+id);
  }
  updateById(id,data)
  {
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type','application/json;charset=utf-8');
    return this.http.put("https://localhost:44322/attorney-registration/update-profile/"+id,JSON.stringify(data),{headers:headers})
  }
}
