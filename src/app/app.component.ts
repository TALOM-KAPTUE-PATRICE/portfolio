import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService
  ) {
    // Configuration initiale de la traduction
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  ngOnInit() {
    // Initialisation du thème au chargement
    this.themeService.initTheme();
  }
}
