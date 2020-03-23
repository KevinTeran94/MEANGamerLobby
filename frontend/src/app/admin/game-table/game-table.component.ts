import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/game.service';
import { AuthenticationService } from '../../service/authentication.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {
  Game: any = [];
  searchText: string;

  constructor(private gameService: GameService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.readGame();
  }

  ngOnInit() {
    if (this.authenticationService.auth()){
      // no action needed
    } else{
      this.router.navigateByUrl('');
    }
  }

  readGame() {
    this.gameService.getGames().subscribe((data) => {
     this.Game = data;
    });
  }

}
