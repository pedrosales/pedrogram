import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home2', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  {
    path: 'home',
    loadChildren: () => import('./pages/take-photo/take-photo.module').then(m => m.TakePhotoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
