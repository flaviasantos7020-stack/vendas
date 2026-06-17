import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../core/services/product';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly productService = inject(ProductService);

  protected readonly loading = this.productService.loading;
  protected readonly naninhas = computed(() => this.productService.list('naninha').slice(0, 3));
  protected readonly fraldas = computed(() => this.productService.list('fralda-bordada').slice(0, 3));
}
