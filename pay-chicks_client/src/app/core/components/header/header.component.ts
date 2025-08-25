import { Component } from '@angular/core';
import { IconsComponent } from '../../../shared/icons/wallet/icons.component';
import { SunComponent } from '../../../shared/icons/sun/sun.component';
import { MoonComponent } from '../../../shared/icons/moon/moon.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [IconsComponent, CommonModule, SunComponent, MoonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private ThemeClass = "data-theme"
  public theme: 'light' | 'dark' = 'light';


  constructor() {

    const currentTheme = document.documentElement.getAttribute(this.ThemeClass);
    this.theme = currentTheme === 'dark' ? 'dark' : 'light';
  }

  public toggleTheme(): void {
    if (this.theme === 'light') {
      document.documentElement.setAttribute(this.ThemeClass, 'dark');
      this.theme = 'dark';
    } else {
      document.documentElement.setAttribute(this.ThemeClass, 'light');
      this.theme = 'light';
    }
  }

}
