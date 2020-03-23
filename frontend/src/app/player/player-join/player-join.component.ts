import { Player } from '../../models/Player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-join',
  templateUrl: './player-join.component.html',
  styleUrls: ['./player-join.component.css']
})
export class PlayerJoinComponent implements OnInit {
  id;
  submitted = false;
  playerJoinForm: FormGroup;
  playerData: Player[];
  playerRank: any = [1,2,3,4,5,6,7,8,9,10];
  playerFavoriteGame: any =['Overwatch','DOTA 2','League of Legends','Halo','World of Warcraft'];
  playerStatus: any =['Available','Unavailable'];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.updatePlayer();
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.getPlayer(this.id);
    this.playerJoinForm = this.fb.group({
      player_name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      favorite_game: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }


  updateFavoriteGame(e){
    this.playerJoinForm.get('favorite_game').setValue(e, {
      onlySelf: true
    })
  }

  updateStatus(e){
    this.playerJoinForm.get('status').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.playerJoinForm.controls;
  }

  getPlayer(id) {
    this.apiService.getPlayer(id).subscribe(data => {
      this.playerJoinForm.patchValue(data);

      // this.playerJoinForm.setValue({
      //   player_name: data['player_name'],
      //   rank: data['rank'],
      //   score: data['score'],
      //   time: data['time'],
      //   favorite_game: data['favorite_game'],
      //   status: data['status'],
      // });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.playerJoinForm.valid) {
    //   return false;
    // } else {
      this.playerJoinForm.patchValue({status: 'Unavailable'});
      if (window.confirm('Are you sure?')) {
        console.log(this.playerJoinForm.value);
        // let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updatePlayer(this.id, this.playerJoinForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

}
