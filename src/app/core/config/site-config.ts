export interface SiteConfig {
  storeName: string;
  tagline: string;
  /** Número no formato internacional, somente dígitos (ex: 55 + DDD + número). */
  whatsappNumber: string;
  instagramUrl?: string;
}

export const SITE_CONFIG: SiteConfig = {
  storeName: 'Flavia Santos Bordados',
  tagline: 'Naninhas e fraldas bordadas com carinho para o seu bebê',
  whatsappNumber: '5514997745063',
  instagramUrl: 'https://instagram.com/ninhodealgodao',
};
