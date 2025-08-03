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
    // S'abonner aux changements de langue pour recharger les données
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadSkills();
    });
    // Charger les données initiales
    this.loadSkills();
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadSkills(): void {
    // Récupérer le tableau complet des compétences depuis le fichier JSON
    this.skills = this.translate.instant('SKILLS_DATA');
    
    // Extraire les catégories uniques et les traduire
    const categoryKeys = [...new Set(this.skills.map(s => s.CATEGORY))];
    this.categories = categoryKeys.map(key => this.translate.instant('SKILLS.' + key));
    
    // Sélectionner la première compétence par défaut si la liste n'est pas vide
    if (this.skills.length > 0) {
      this.selectSkill(this.skills[0]);
    }
  }
  
  /**
   * Sélectionne une compétence pour l'afficher en détail.
   * @param skill L'objet compétence à afficher.
   */
  selectSkill(skill: SkillDisplay): void {
    this.selectedSkill = skill;
  }

    /**
   * Retourne les clés de catégorie uniques (ex: 'CATEGORY_FRONTEND').
   * C'est la fonction que notre HTML corrigé utilise.
   */
  getCategoryKeys(): string[] {
    return [...new Set(this.skills.map(s => s.CATEGORY))];
  }


  /**
   * Retourne les compétences filtrées par catégorie.
   * @param categoryKey La clé de la catégorie (ex: 'CATEGORY_FRONTEND').
   */
  getSkillsByCategory(categoryKey: string): SkillDisplay[] {
    return this.skills.filter(s => s.CATEGORY === categoryKey);
  }
}