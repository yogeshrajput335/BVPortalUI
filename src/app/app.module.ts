import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './features/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { AssetsComponent } from './features/assets/assets.component';
import { CoreModule } from './shared/core.module';
import { NavComponent } from './shared/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationInterceptor } from './core/services/authentication.interceptor';
import { RouterModule } from '@angular/router';
import { IndexNavbarComponent } from './shared/index-navbar/index-navbar.component';
import { IndexComponent } from './features/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    IndexComponent,
    IndexNavbarComponent,
   ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [AuthenticationInterceptor],

  bootstrap: [AppComponent]
})
export class AppModule { }
