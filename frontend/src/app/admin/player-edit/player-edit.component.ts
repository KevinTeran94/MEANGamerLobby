import { Player } from '../../models/Player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';



@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})

export class PlayerEditComponent implements OnInit {
  submitted = false;
  playerEditForm: FormGroup;
  playerData: Player[];
  playerRank: any = [1,2,3,4,5,6,7,8,9,10];
  playerFavoriteGame: any =['Overwatch','DOTA 2','League of Legends','Halo','World of Warcraft'];
  playerStatus: any =['Available','Unavailable'];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authenticationService.auth()){
      // no action needed
    } else{
      this.router.navigateByUrl('');
    }
    this.updatePlayer();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPlayer(id);
    this.playerEditForm = this.fb.group({
      player_name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      favorite_game: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  // Choose options with select-dropdown
  updateRank(e){
    this.playerEditForm.get('rank').setValue(e, {
      onlySelf: true
    })
  }

  updateFavoriteGame(e){
    this.playerEditForm.get('favorite_game').setValue(e, {
      onlySelf: true
    })
  }

  updateStatus(e){
    this.playerEditForm.get('status').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.playerEditForm.controls;
  }

  getPlayer(id) {
    this.apiService.getPlayer(id).subscribe(data => {
      this.playerEditForm.setValue({
        player_name: data['player_name'],
        rank: data['rank'],
        score: data['score'],
        time: data['time'],
        favorite_game: data['favorite_game'],
        status: data['status'],
      });
    });
  }

  updatePlayer() {
    this.playerEditForm = this.fb.group({
      player_name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      favorite_game: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.playerEditForm.valid)
    if (!this.playerEditForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updatePlayer(id, this.playerEditForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/players-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
