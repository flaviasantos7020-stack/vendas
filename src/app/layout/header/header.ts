import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SITE_CONFIG } from '../../core/config/site-config';
import { WhatsappService } from '../../core/services/whatsapp';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly whatsapp = inject(WhatsappService);

  protected readonly storeName = SITE_CONFIG.storeName;
  protected readonly contactLink = this.whatsapp.buildContactLink(
    'Olá! Vim do site e queria saber mais sobre as naninhas e fraldas bordadas.',
  );
}
