import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { CtaComponent } from '../../core/components/cta/cta.component';
import { HeroComponent } from '../../core/components/hero/hero.component';
import { IconsComponent } from '../../shared/icons/wallet/icons.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, IconsComponent, HeroComponent, CtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
