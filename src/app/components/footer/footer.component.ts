import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

    // La fonction que le template HTML recherchait
  public getYear(): number {
    return new Date().getFullYear();
  }


}
