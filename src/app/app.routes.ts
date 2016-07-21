import { provideRouter, RouterConfig } from '@angular/router';
import { DefaultComponent }  from './default.component';
import { SettingsComponent }    from './settings.component';

const routes: RouterConfig = [
  { path: '', component: DefaultComponent },
  { path: 'settings', component: SettingsComponent }
];
export const appRouterProviders = [
  provideRouter(routes)
];
