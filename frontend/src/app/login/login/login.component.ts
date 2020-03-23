import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  //showErrorMessage = false;

  constructor(
    public fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private actRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.auth()){
      this.router.navigateByUrl('/players-list');
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get myForm() {
    return this.loginForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.valid){
      let info = this.loginForm.value;
      this.authenticationService.login(info.username, info.password);
    } else{
      console.log("Auth: failed");
      // this.showErrorMessage = true;
      // console.log(this.showErrorMessage);
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

}
