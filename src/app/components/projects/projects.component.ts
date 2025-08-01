import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model'; // Importez le modèle


@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
 
})


export class ProjectsComponent implements OnInit {

  projects: Project[] = [
    {
      id: 1,
      title: 'Application Web de Gestion E-commerce avec IA',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'JWT', 'AWS'],
      description: 'Une plateforme complète pour la gestion de produits, commandes et clients, avec un module de recommandation de produits basé sur l\'historique d\'achats.',
      imageUrl: 'assets/images/project1.jpg', // Placez une image dans src/assets/images/
      projectUrl: 'https://lien-vers-votre-demo.com',
      repoUrl: 'https://github.com/votre-nom/votre-projet'
    },
    {
      id: 2,
      title: 'Pipeline CI/CD pour Application Java',
      technologies: ['DevOps', 'Jenkins', 'Docker', 'GitHub Actions'],
      description: 'Mise en place d\'un pipeline d\'intégration et de déploiement continus pour automatiser les tests, la création d\'images Docker et le déploiement sur un serveur.',
      imageUrl: 'assets/images/project2.jpg',
      repoUrl: 'https://github.com/votre-nom/votre-pipeline'
    }
    
  ];

  constructor() { }

  ngOnInit(): void {
  }
}