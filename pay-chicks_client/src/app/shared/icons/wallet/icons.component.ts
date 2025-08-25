import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icons',
  imports: [],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css'
})
export class IconsComponent {
  @Input() name = '';
  @Input() size = '24'; // default size in px
  @Input() color = 'currentColor';

}
