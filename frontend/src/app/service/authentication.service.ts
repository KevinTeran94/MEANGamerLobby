import { Injectable } from '@angular/core';
import { Admin } from '../models/Admin';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authorized: Admin = null;
  baseUri: string = 'http://localhost:4000/admin';

  constructor(private http: HttpClient, private router: Router) { }

  auth(): boolean {return this.authorized != null;}

  login(username, password){
    this.authAdmin({username: username, password: password});
  }

  authAdmin(adminInfo){
    let url = `${this.baseUri}/login-check`;
    this.http.post(url, adminInfo).subscribe((response) =>{
      if (response!="" && response!=null && response!=" "){
        this.authorized = Object.assign(new Admin(), response);
        if (this.authorized != null) {
          this.router.navigateByUrl('/players-list');
        }
      } else {
        console.log('Authentication: Invalid Username or password')
      }
    })
  }
}
