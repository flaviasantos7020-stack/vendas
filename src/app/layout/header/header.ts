import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { SITE_CONFIG } from '../../core/config/site-config';
import { WhatsappService } from '../../core/services/whatsapp';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly whatsapp = inject(WhatsappService);

  protected readonly storeName = SITE_CONFIG.storeName;
  protected readonly isHome = signal(this.router.url === '/');
  protected readonly contactLink = this.whatsapp.buildContactLink(
    'Olá! Vim do site e queria saber mais sobre as naninhas e fraldas bordadas.',
  );

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.isHome.set(this.router.url === '/'));
  }
}
