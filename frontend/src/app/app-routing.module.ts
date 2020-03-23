import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerAddComponent } from './admin/player-add/player-add.component';
import { PlayerListComponent } from './admin/player-list/player-list.component';
import { PlayerEditComponent } from './admin/player-edit/player-edit.component';
import { PlayerTableComponent} from './player/player-table/player-table.component';
import { PlayerJoinComponent } from './player/player-join/player-join.component';
import { LoginComponent } from './login/login/login.component';
import { GameTableComponent } from './admin/game-table/game-table.component';

const routes: Routes = [
  { path: '', component: PlayerTableComponent},
  { path: 'login', component: LoginComponent},
  { path: 'add-player', component: PlayerAddComponent },
  { path: 'edit-player/:id', component: PlayerEditComponent },
  { path: 'players-list', component: PlayerListComponent },
  { path: 'player-join/:id', component: PlayerJoinComponent},
  { path: 'games', component: GameTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
