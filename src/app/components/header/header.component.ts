import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    // Animation pour l'apparition du prénom "PATRICE"
    trigger('nameAnimation', [
      transition(':enter', [
        style({ opacity: 0, width: '0px' }),
        animate('400ms ease-out', style({ opacity: 1, width: '*' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

    // Gère l'affichage du nom complet
  isNameExpanded = false;
  
  // Émet un événement au parent (AppComponent) pour ouvrir le sidenav
  @Output() menuToggle = new EventEmitter<void>();

  isDarkMode: boolean = false;
  currentLang: string = 'fr';

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.currentLang = this.translate.currentLang || 'fr';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
     this.isDarkMode = this.themeService.isDarkMode();
  }

    // Inverse l'état d'affichage du nom
  toggleNameDisplay(): void {
    this.isNameExpanded = !this.isNameExpanded;
  }

  // Émet l'événement pour que le parent gère l'ouverture du menu
  onMenuToggle(): void {
    this.menuToggle.emit();
  }


  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }



}
