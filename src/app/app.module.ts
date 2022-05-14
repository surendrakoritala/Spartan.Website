import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AlertComponent } from './_components';
import { ErrorInterceptor } from './_helpers';
import { AppRoutingModule } from './app-routing.module';
import { MsalModule, MsalRedirectComponent, MsalGuard } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { AnalyticsComponent } from './analytics/analytics.component';
import { environment } from 'src/environments/environment';
import { TeamComponent, TeamThumbnailComponent, TeamService } from './team';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PowerBIEmbedModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.aadClientId,
          authority:
            'https://login.microsoftonline.com/' + environment.tenantId,
          redirectUri: environment.redirectUrl,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ['Enter_the_Graph_Endpoint_Here/v1.0/me', ['Claim.read']],
        ]),
      }
    ),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    AnalyticsComponent,
    TeamComponent,
    TeamThumbnailComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TeamService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
