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
  techs: string[];
   
}

@Component({
  selector: 'app-projects',
  standalone: false,  
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
 projects: ProjectDisplay[] = [];
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
      { id: 1, key: 'PROJECT_0', url: '#', repo: '#' },
      { id: 2, key: 'PROJECT_1', repo: '#' },
      { id: 3, key: 'PROJECT_2', url: '#', repo: '#' },
      { id: 4, key: 'PROJECT_3', url: '#', repo: '#' },
      { id: 5, key: 'PROJECT_4', repo: '#' }
    ];

    // On récupère le bloc de traduction complet
    this.translate.get('PROJECTS_DATA').subscribe(translations => {
      // On s'assure que les traductions sont bien là
      if (Array.isArray(translations)) {
        this.projects = projectMetaData.map((meta, index) => {
          const translatedProject = translations[index];
          return {
            id: meta.id,
            projectKey: meta.key,
            projectUrl: meta.url,
            repoUrl: meta.repo,
            currentImageIndex: 0,
            // On assigne les tableaux directement
            imageUrls: translatedProject.IMAGE_URLS || [],
            techs: translatedProject.TECHS || []
          };
        });
      }
    });
  }

  nextImage(project: ProjectDisplay): void {
    if (project.imageUrls.length === 0) return;
    project.currentImageIndex = (project.currentImageIndex + 1) % project.imageUrls.length;
  }

  prevImage(project: ProjectDisplay): void {
    if (project.imageUrls.length === 0) return;
    project.currentImageIndex = (project.currentImageIndex - 1 + project.imageUrls.length) % project.imageUrls.length;
  }
}