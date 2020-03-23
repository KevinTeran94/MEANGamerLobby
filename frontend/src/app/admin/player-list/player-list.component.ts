import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import {  Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})

export class PlayerListComponent implements OnInit {
  Player: any = [];
  searchText: string;

  constructor(
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.readPlayer();
  }

  ngOnInit() {
    if (this.authenticationService.auth()){
      // no action needed
    } else{
      this.router.navigateByUrl('');
    }
  }

  readPlayer() {
    this.apiService.getPlayers().subscribe((data) => {
     this.Player = data;
    });
  }

  removePlayer(player, index) {
    if (window.confirm('Are you sure?')) {
        console.log(index);
        console.log(player);
        this.apiService.deletePlayer(player._id).subscribe((data) => {
          this.Player.splice(index, 1);
        }
      );
    }
  }

}
