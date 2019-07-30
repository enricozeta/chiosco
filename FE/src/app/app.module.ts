import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatGridTile, MatGridList, MatCard, MatCardTitle, MatCardSubtitle, MatCardHeader
  , MatCardContent, MatCardActions, MatDivider, MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav,
  MatSidenavContent, MatSidenavContainer, MatCheckboxModule, MatRippleModule, MatButton, MatDialogModule,
  MatSelectModule, MatTableModule } from '@angular/material';
import { DialogTeamComponent } from './dialog-team/dialog-team.component';
import { OrderService } from 'core/Order/OrderService';
import { CoppaChioscoComponent } from './coppa-chiosco/coppa-chiosco.component';
import { CoppaChioscoService } from 'core/CoppaChiosco/CoppaChioscoService';
import { SocketService } from 'core/CoppaChiosco/SocketService';

const appRoutes: Routes = [
  { path: 'bar', component: BarComponent },
  { path: 'coppaChiosco', component: CoppaChioscoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    MatGridTile,
    MatGridList,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatDivider,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatButton,
    DialogTeamComponent,
    CoppaChioscoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRippleModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AppRoutingModule
  ],
  providers: [OrderService, CoppaChioscoService, SocketService],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
