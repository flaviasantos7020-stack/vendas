import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { DRIVE_CONFIG } from '../config/drive-config';
import { Product, ProductCategory } from '../models/product.model';

const CATEGORIES: ProductCategory[] = ['naninha', 'fralda-bordada'];

interface DriveFile {
  id: string;
  name: string;
}

interface DriveListResponse {
  files?: DriveFile[];
}

interface ParsedFileName {
  category: ProductCategory;
  nameSlug: string;
  price: number;
  size?: string;
  index: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly products = signal<Product[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.loadProducts();
  }

  list(category?: ProductCategory): Product[] {
    const all = this.products();
    return category ? all.filter((product) => product.category === category) : all;
  }

  getBySlug(slug: string): Product | undefined {
    return this.products().find((product) => product.slug === slug);
  }

  private async loadProducts(): Promise<void> {
    try {
      const files = await this.fetchDriveFiles();
      this.products.set(this.groupFilesIntoProducts(files));
    } catch (error) {
      console.error('Não foi possível carregar os produtos do Google Drive.', error);
      this.products.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  private async fetchDriveFiles(): Promise<DriveFile[]> {
    const query = encodeURIComponent(
      `'${DRIVE_CONFIG.folderId}' in parents and trashed = false and mimeType contains 'image/'`,
    );
    const url =
      `https://www.googleapis.com/drive/v3/files?q=${query}` +
      `&fields=files(id,name)&pageSize=1000&key=${DRIVE_CONFIG.apiKey}`;

    const response = await firstValueFrom(this.http.get<DriveListResponse>(url));
    return response.files ?? [];
  }

  private groupFilesIntoProducts(files: DriveFile[]): Product[] {
    const groups = new Map<
      string,
      {
        category: ProductCategory;
        nameSlug: string;
        price: number;
        size?: string;
        images: { index: number; fileId: string }[];
      }
    >();

    for (const file of files) {
      const parsed = this.parseFileName(file.name);
      if (!parsed) {
        console.warn(`Nome de arquivo fora do padrão, ignorado: "${file.name}"`);
        continue;
      }

      const key = `${parsed.category}_${parsed.nameSlug}`;
      const group = groups.get(key);
      if (group) {
        group.images.push({ index: parsed.index, fileId: file.id });
        group.size ??= parsed.size;
      } else {
        groups.set(key, {
          category: parsed.category,
          nameSlug: parsed.nameSlug,
          price: parsed.price,
          size: parsed.size,
          images: [{ index: parsed.index, fileId: file.id }],
        });
      }
    }

    return Array.from(groups.entries()).map(([key, group]) => ({
      id: key,
      slug: key,
      name: this.toDisplayName(group.nameSlug),
      category: group.category,
      price: group.price,
      size: group.size,
      images: group.images
        .sort((a, b) => a.index - b.index)
        .map((image) => this.buildImageUrl(image.fileId)),
    }));
  }

  private parseFileName(fileName: string): ParsedFileName | null {
    const dotIndex = fileName.lastIndexOf('.');
    const base = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
    const [category, nameSlug, priceRaw, ...rest] = base.split('_');

    if (!category || !nameSlug || !priceRaw) return null;
    if (!CATEGORIES.includes(category as ProductCategory)) return null;

    const price = parseFloat(priceRaw.replace(',', '.'));
    if (Number.isNaN(price)) return null;

    let size: string | undefined;
    let index = 1;

    for (const token of rest) {
      if (/^\d+x\d+$/i.test(token)) {
        size = token.toLowerCase();
      } else if (/^\d+$/.test(token)) {
        index = parseInt(token, 10);
      }
    }

    return {
      category: category as ProductCategory,
      nameSlug,
      price,
      size,
      index: Number.isNaN(index) ? 1 : index,
    };
  }

  private toDisplayName(nameSlug: string): string {
    return nameSlug
      .split('-')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private buildImageUrl(fileId: string): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
}
