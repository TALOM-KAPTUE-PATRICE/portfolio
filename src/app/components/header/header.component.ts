import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isDarkMode: boolean = false;
  currentLang: string = 'fr';

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.currentLang = this.translate.currentLang;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

}
