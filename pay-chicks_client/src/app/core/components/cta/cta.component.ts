import { Component } from '@angular/core';

@Component({
  selector: 'app-cta',
  imports: [],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {
    imagePath = 'assets/pay_chick.png';

    ngOnInit() {
    this.updateImage();

    // Optional: Listen for theme changes (if you update data-theme dynamically)
    const observer = new MutationObserver(() => {
      this.updateImage();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

    private updateImage() {
      const theme = document.documentElement.getAttribute('data-theme');
      this.imagePath = theme === 'dark'
    ? 'assets/pay_chick_dark.png'
    : 'assets/pay_chick.png';
    }
 }
