import { Component, OnInit } from '@angular/core'; // Importer OnInit
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Skill {
  name: string;
  svg: SafeHtml;
}

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit { // Implémenter OnInit

  // 1. On déclare la propriété de la classe, mais on ne l'initialise pas ici.
  skills: Skill[] = [];

  // 2. Le sanitizer est injecté via le constructeur. Il est prêt à l'emploi.
  constructor(private sanitizer: DomSanitizer) {}

  // 3. ngOnInit est appelé automatiquement par Angular APRÈS le constructeur.
  //    C'est l'endroit parfait pour initialiser nos données.
  ngOnInit(): void {
    this.skills = [
      // Maintenant, 'this.sanitizer' existe et peut être utilisé sans erreur.
      { name: 'Angular', svg: this.sanitizer.bypassSecurityTrustHtml('<svg viewBox="0 0 250 250">...</svg>') }, // Remplacez ... par le code SVG complet
      { name: 'Spring', svg: this.sanitizer.bypassSecurityTrustHtml('<svg>...</svg>') },
      { name: 'Java', svg: this.sanitizer.bypassSecurityTrustHtml('<svg>...</svg>') },
      { name: 'Docker', svg: this.sanitizer.bypassSecurityTrustHtml('<svg>...</svg>') },
      { name: 'AWS', svg: this.sanitizer.bypassSecurityTrustHtml('<svg>...</svg>') },
      { name: 'PostgreSQL', svg: this.sanitizer.bypassSecurityTrustHtml('<svg>...</svg>') },
      { name: 'Git', svg: this.sanitizer.bypassSecurityTrustHtml('<svg>...</svg>') },
      { name: 'Jenkins', svg: this.sanitizer.bypassSecurityTrustHtml('<svg>...</svg>') },
    ];
  }
}