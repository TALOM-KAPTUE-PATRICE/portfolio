export interface Project {
  id: number;
  title: string;
  technologies: string[];
  description: string;
  imageUrl: string; // Un lien vers une capture d'écran de votre projet
  projectUrl?: string; // Lien optionnel vers le projet en ligne
  repoUrl?: string;    // Lien optionnel vers le dépôt GitHub
}