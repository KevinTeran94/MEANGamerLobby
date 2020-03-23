import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Game } from './models/Game';

@Pipe({
  name: 'gameFilter'
})

@Injectable()

export class GameFilterPipe implements PipeTransform {

  transform(games: Game[], searchText: string) {
    return games.filter(game => game.title.toLowerCase().indexOf(searchText)!== -1)
  }

}
