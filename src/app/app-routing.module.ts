import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guard/auth.guard';
import { canPublicActivateGuard, canPublicMatchGuard } from './auth/guard/public.guard';


const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule),canActivate: [canPublicActivateGuard],
    canMatch: [canPublicMatchGuard],
      
  },
  {
    path: 'heroes',
    loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard],
  },
  {
    path: '404',
    component:Error404PageComponent,

  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo:'404'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
