import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { ProductService } from '../../../core/services/product';
import { WhatsappService } from '../../../core/services/whatsapp';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly whatsapp = inject(WhatsappService);

  protected readonly loading = this.productService.loading;
  private readonly slug = signal('');
  protected readonly product = computed(() => this.productService.getBySlug(this.slug()));
  protected readonly buyLink = computed(() => {
    const product = this.product();
    return product ? this.whatsapp.buildProductLink(product) : '';
  });

  constructor() {
    this.slug.set(this.route.snapshot.paramMap.get('slug') ?? '');
  }
}
