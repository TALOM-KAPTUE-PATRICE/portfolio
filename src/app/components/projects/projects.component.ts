import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

// Interface pour nos données de projet traduites
interface TranslatedProject {
  TITLE: string;
  TYPE: string;
  DESCRIPTION: string;
  POINTS_FORTS: string[];
  TECHS: string[];
  IMAGE_URLS: string[];
}

// Interface pour l'affichage, incluant les métadonnées
interface ProjectDisplay {
  id: number;
  projectUrl?: string;
  repoUrl?: string;
  data: TranslatedProject;
}

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    // Animation pour l'apparition des cartes de projet
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    // Animation pour la lightbox
    trigger('lightboxAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  allProjects: ProjectDisplay[] = [];
  filteredProjects: ProjectDisplay[] = [];
  
  // Gestion des filtres
  technologies: string[] = [];
  activeFilter: string = 'Tous';

  // Gestion de la lightbox
  isLightboxOpen = false;
  lightboxImages: string[] = [];
  currentLightboxImageIndex = 0;
  
  private langChangeSub!: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
    this.loadProjects();
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadProjects(): void {
    const projectMetaData = [
      { id: 1, url: 'https://educamer.netlify.app', repo: 'https://github.com/TALOM-KAPTUE-PATRICE/educamer2' },
      { id: 2, url: '#', repo: '#' },
      { id: 3, url: '#', repo: '#' }
      // Ajoutez les métadonnées des autres projets ici...
    ];

    this.translate.get('PROJECTS_DATA').subscribe((translations: TranslatedProject[]) => {
      if (Array.isArray(translations)) {
        this.allProjects = translations.map((data, index) => ({
          id: projectMetaData[index]?.id || index + 1,
          projectUrl: projectMetaData[index]?.url,
          repoUrl: projectMetaData[index]?.repo,
          data: data
        }));
        this.updateFilters();
        this.filterProjects('Tous');
      }
    });
  }
  
  updateFilters(): void {
    const allTechs = this.allProjects.flatMap(p => p.data.TECHS);
    this.technologies = [...new Set(allTechs)];
  }

  filterProjects(tech: string): void {
    this.activeFilter = tech;
    if (tech === 'Tous') {
      this.filteredProjects = [...this.allProjects];
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.data.TECHS.includes(tech));
    }
  }

  // --- Fonctions de la Lightbox ---

  openLightbox(images: string[], index: number): void {
    this.lightboxImages = images;
    this.currentLightboxImageIndex = index;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  nextLightboxImage(): void {
    this.currentLightboxImageIndex = (this.currentLightboxImageIndex + 1) % this.lightboxImages.length;
  }

  prevLightboxImage(): void {
    this.currentLightboxImageIndex = (this.currentLightboxImageIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;
  }
}