import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

// Interface pour nos objets de compétence traduits
interface SkillDisplay {
  NAME: string;
  LEVEL: string;
  CATEGORY: string;
  DESCRIPTION: string;
}

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    // Une animation de fondu pour la carte de détails
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit, OnDestroy {
  
 skills: SkillDisplay[] = [];
  selectedSkill: SkillDisplay | null = null;
  categories: string[] = [];
  private langChangeSub!: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // S'abonner aux changements de langue ET au chargement initial
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadSkills();
    });

    // Charger les données initiales de manière sûre
    this.loadSkills();
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadSkills(): void {
    // get() est asynchrone, il attend que la traduction soit disponible.
    this.translate.get('SKILLS_DATA').subscribe((translatedSkills: SkillDisplay[]) => {
      // Ce code ne s'exécute QUE si 'translatedSkills' est bien un tableau.
      this.skills = translatedSkills;
      
      // On peut maintenant utiliser .map() en toute sécurité
      const categoryKeys = [...new Set(this.skills.map(s => s.CATEGORY))];
      
      this.translate.get(categoryKeys.map(key => 'SKILLS.' + key)).subscribe(translations => {
        this.categories = Object.values(translations);
      });
      
      if (this.skills.length > 0) {
        this.selectSkill(this.skills[0]);
      }
    });
  }
  
  selectSkill(skill: SkillDisplay): void {
    this.selectedSkill = skill;
  }

  getCategoryKeys(): string[] {
    // Vérification de sécurité pour éviter les erreurs si this.skills n'est pas encore prêt
    if (!Array.isArray(this.skills)) {
      return [];
    }
    return [...new Set(this.skills.map(s => s.CATEGORY))];
  }

  getSkillsByCategory(categoryKey: string): SkillDisplay[] {
    if (!Array.isArray(this.skills)) {
      return [];
    }
    return this.skills.filter(s => s.CATEGORY === categoryKey);
  }
}