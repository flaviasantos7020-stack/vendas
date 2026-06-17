import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductService } from '../../../core/services/product';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductCategory } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  protected readonly category = signal<ProductCategory | undefined>(undefined);
  protected readonly loading = this.productService.loading;
  protected readonly products = computed(() => this.productService.list(this.category()));

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const categoria = params.get('categoria') as ProductCategory | null;
      this.category.set(categoria ?? undefined);
    });
  }
}
