import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // <-- AJOUTÉ
import { MatMenuModule } from '@angular/material/menu';  
import { MatSidenavModule } from '@angular/material/sidenav'; // <-- AJOUTÉ
import { MatListModule } from '@angular/material/list';       // <-- AJOUTÉ  


@NgModule({

  exports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule, 
    MatMenuModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
    
    
    
   
  ]
})
export class MaterialModule { }