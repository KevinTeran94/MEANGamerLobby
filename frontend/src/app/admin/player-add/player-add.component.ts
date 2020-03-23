import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})

export class PlayerAddComponent implements OnInit {
  submitted = false;
  addPlayerForm: FormGroup;
  playerRank: any = [1,2,3,4,5,6,7,8,9,10];
  playerFavoriteGame: any =['Overwatch','DOTA 2','League of Legends','Halo','World of Warcraft'];
  playerStatus: any =['Available','Unavailable'];


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { 
    if (this.authenticationService.auth()){
      // no action needed
    } else{
      this.router.navigateByUrl('');
    }
  }

  mainForm() {
    this.addPlayerForm = this.fb.group({
      player_name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      favorite_game: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
  }

  // Choose rank with select dropdown
  updateRank(e){
    this.addPlayerForm.get('rank').setValue(e, {
      onlySelf: true
    })
  }

  updateFavoriteGame(e){
    this.addPlayerForm.get('favorite_game').setValue(e, {
      onlySelf: true
    })
  }

  updateStatus(e){
    this.addPlayerForm.get('status').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.addPlayerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.addPlayerForm.valid)
    if (!this.addPlayerForm.valid) {
      return false;
    } else {
      this.apiService.addPlayer(this.addPlayerForm.value).subscribe(
        (res) => {
          console.log('Player successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/players-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}