
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // ===============================================
    // C'EST LA PARTIE LA PLUS IMPORTANTE
    // ===============================================
    anchorScrolling: 'enabled', // Active le défilement vers les ancres
    scrollPositionRestoration: 'enabled' // Restaure la position au rechargement
    // ===============================================
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }