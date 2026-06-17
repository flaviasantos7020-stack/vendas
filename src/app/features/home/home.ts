import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../core/services/product';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { SITE_CONFIG } from '../../core/config/site-config';
import { WhatsappService } from '../../core/services/whatsapp';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly productService = inject(ProductService);
  private readonly whatsapp = inject(WhatsappService);

  protected readonly tagline = SITE_CONFIG.tagline;
  protected readonly loading = this.productService.loading;
  protected readonly naninhas = computed(() => this.productService.list('naninha').slice(0, 3));
  protected readonly fraldas = computed(() => this.productService.list('fralda-bordada').slice(0, 3));
  protected readonly contactLink = this.whatsapp.buildContactLink(
    'Olá! Vim do site e queria saber mais sobre as naninhas e fraldas bordadas.',
  );
}
