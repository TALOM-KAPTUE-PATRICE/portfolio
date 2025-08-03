import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface ProjectDisplay {
  id: number;
  projectKey: string;
  projectUrl?: string;
  repoUrl?: string;
  currentImageIndex: number;
  // On ajoute une propriété pour stocker la liste des URLs d'images traduites
  imageUrls: string[]; 
}

@Component({
  selector: 'app-projects',
  standalone: false,  
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  // On initialise avec une liste vide
  projects: ProjectDisplay[] = [];
  
  // On utilise une souscription pour éviter les fuites de mémoire
  private langChangeSub!: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // On s'abonne aux changements de langue
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });

    // On charge les projets une première fois avec la langue actuelle
    this.loadProjects();
  }

  // Méthode pour charger et traduire les projets
  loadProjects(): void {
    const projectKeys = [
      { id: 1, projectKey: 'PROJECT_0', projectUrl: '#', repoUrl: '#' },
      { id: 2, projectKey: 'PROJECT_1', repoUrl: '#' },
      { id: 3, projectKey: 'PROJECT_2', projectUrl: '#', repoUrl: '#' },
      { id: 4, projectKey: 'PROJECT_3', projectUrl: '#', repoUrl: '#' },
      { id: 5, projectKey: 'PROJECT_4', repoUrl: '#' }
    ];

    this.projects = projectKeys.map(p => ({
      ...p,
      currentImageIndex: 0,
      // Le service de traduction nous donne directement le bon tableau d'images
      imageUrls: this.translate.instant('PROJECTS_DATA.' + p.id + '.IMAGE_URLS')
    }));
  }

  // On se désabonne quand le composant est détruit pour éviter les fuites mémoire
  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  // Les fonctions de navigation n'ont plus besoin de 'totalImages'
  nextImage(project: ProjectDisplay): void {
    project.currentImageIndex = (project.currentImageIndex + 1) % project.imageUrls.length;
  }

  prevImage(project: ProjectDisplay): void {
    project.currentImageIndex = (project.currentImageIndex - 1 + project.imageUrls.length) % project.imageUrls.length;
  }
}