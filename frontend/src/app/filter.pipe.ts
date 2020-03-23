import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Player } from './models/Player';

@Pipe({
  name: 'filter'
})

@Injectable()

export class FilterPipe implements PipeTransform {

  transform(players: Player[], searchText: string) {
    return players.filter(player => player.player_name.indexOf(searchText)!== -1)
  }

}
