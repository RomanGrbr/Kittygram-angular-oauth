import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCatComponent } from './components/add-cat/add-cat.component';
import { CatDetailsComponent } from './components/cat-details/cat-details.component';
import { CatsListComponent } from './components/cats-list/cats-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCatComponent,
    CatDetailsComponent,
    CatsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
