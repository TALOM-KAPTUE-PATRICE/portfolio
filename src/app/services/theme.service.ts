import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    // S'il y a un thème dans le localStorage, on l'utilise, SINON, on met 'light' par défaut.
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    this.setTheme(savedTheme);
  }

  isDarkMode() {
    return this.currentTheme === 'dark';
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    // On retire systématiquement l'ancienne classe avant d'ajouter la nouvelle si besoin.
    this.renderer.removeClass(document.body, 'dark-theme');
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
    }
    localStorage.setItem('theme', theme);
  }

}