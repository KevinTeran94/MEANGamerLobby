import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerAddComponent } from './admin/player-add/player-add.component';
import { PlayerEditComponent } from './admin/player-edit/player-edit.component';
import { PlayerListComponent } from './admin/player-list/player-list.component';
import { PlayerTableComponent } from './player/player-table/player-table.component';
import { PlayerJoinComponent } from './player/player-join/player-join.component';
import { LoginComponent } from './login/login/login.component';
import { GameTableComponent } from './admin/game-table/game-table.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { GameFilterPipe } from './game-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayerAddComponent,
    PlayerEditComponent,
    PlayerListComponent,
    PlayerTableComponent,
    PlayerJoinComponent,
    LoginComponent,
    GameTableComponent,
    FilterPipe,
    GameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
