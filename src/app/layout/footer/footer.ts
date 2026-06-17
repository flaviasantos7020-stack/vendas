import { Component } from '@angular/core';

import { SITE_CONFIG } from '../../core/config/site-config';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly storeName = SITE_CONFIG.storeName;
  protected readonly instagramUrl = SITE_CONFIG.instagramUrl;
  protected readonly year = new Date().getFullYear();
}
