import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AnalyticsComponent } from './analytics';
import { TeamComponent } from './team';
import { MsalGuard } from '@azure/msal-angular';

const isIframe = window !== window.parent && !window.opener;
const ClaimsModule = () =>
  import('./claims/claims.module').then((x) => x.ClaimsModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'claims', loadChildren: ClaimsModule, canActivate: [MsalGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [MsalGuard] },
  { path: 'team', component: TeamComponent, canActivate: [MsalGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIframe ? 'enabled' : 'disabled', // Don't perform initial navigation in iframes
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
