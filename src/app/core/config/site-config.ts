export interface SiteConfig {
  storeName: string;
  tagline: string;
  /** Número no formato internacional, somente dígitos (ex: 55 + DDD + número). */
  whatsappNumber: string;
  instagramUrl?: string;
}

export const SITE_CONFIG: SiteConfig = {
  storeName: 'Ninho de Algodão',
  tagline: 'Naninhas e fraldas bordadas feitas à mão, com carinho para o seu bebê',
  whatsappNumber: '5511999999999',
  instagramUrl: 'https://instagram.com/ninhodealgodao',
};
