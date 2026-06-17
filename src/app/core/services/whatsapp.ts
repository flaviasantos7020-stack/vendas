import { Injectable } from '@angular/core';

import { SITE_CONFIG } from '../config/site-config';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  buildContactLink(message: string): string {
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  buildProductLink(product: Product): string {
    const price = product.price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const message = `Olá! Vim do site e tenho interesse na "${product.name}" (${price}). Pode me ajudar?`;
    return this.buildContactLink(message);
  }
}
