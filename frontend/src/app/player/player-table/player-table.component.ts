import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})

export class PlayerTableComponent implements OnInit {
  Player: any = [];
  searchText: string;


  constructor(private apiService: ApiService) {
    this.readPlayer();
  }

  ngOnInit() {}

  readPlayer() {
    this.apiService.getPlayers().subscribe((data) => {
     this.Player = data;
    });
  }
}
