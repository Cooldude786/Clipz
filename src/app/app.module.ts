import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VideoModule } from './video/video.module';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';


function initApp(auth: AuthService) {
  return () => {
    return new Promise<void>((resolve, reject) => {
      // Do some asynchronous stuff
      auth.isAuthenticated$.pipe(take(1)).subscribe((user)=> {
        resolve();
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    VideoModule,
    AppRoutingModule,
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthService, AngularFireAuth],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
