import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { WhatsappService } from '../../../core/services/whatsapp';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private readonly whatsapp = inject(WhatsappService);

  readonly product = input.required<Product>();

  protected readonly buyLink = computed(() => this.whatsapp.buildProductLink(this.product()));
}
