/**
 * Catálogo lido direto de uma pasta pública do Google Drive.
 *
 * Para adicionar ou editar um produto, basta subir/renomear a foto na pasta do Drive
 * seguindo o padrão de nome (sem acentos, categoria exata):
 *
 *   categoria_nome-do-produto_preco.ext
 *   categoria_nome-do-produto_preco_tamanho.ext            (com tamanho em cm)
 *   categoria_nome-do-produto_preco_indice.ext             (2ª, 3ª... foto do mesmo produto)
 *   categoria_nome-do-produto_preco_tamanho_indice.ext     (tamanho + várias fotos)
 *
 * categoria: "naninha" ou "fralda-bordada"
 * preco: use ponto como separador decimal (ex: 89.90)
 * tamanho (opcional): formato LARGURAxALTURA em cm (ex: 35x35) — só é reconhecido nesse formato
 * indice (opcional): número simples (1, 2, 3...) pra ordenar fotos do mesmo produto
 *
 * Exemplos:
 *   naninha_coelhinho-rosa_89.90.jpg
 *   naninha_raposa_89.90_35x35.jpg
 *   naninha_raposa_89.90_35x35_2.jpg
 *   fralda-bordada_floral-azul_42.90.jpg
 *
 * Configuração necessária (Google Cloud Console):
 * 1. Crie/abra um projeto em https://console.cloud.google.com
 * 2. Ative a "Google Drive API"
 * 3. Crie uma credencial do tipo "API key" e restrinja por "API restrictions" -> Drive API
 * 4. No Google Drive, crie uma pasta, suba as fotos com o padrão acima, e compartilhe a
 *    pasta como "Qualquer pessoa com o link" (somente leitura)
 * 5. Copie o ID da pasta (parte da URL após /folders/) e cole abaixo
 */
export interface DriveConfig {
  apiKey: string;
  folderId: string;
}

export const DRIVE_CONFIG: DriveConfig = {
  apiKey: 'AIzaSyAumE-T6ediwcBNRzMozj-UGILi0GMtZlY',
  folderId: '1FLfS0c5xSzucM9AkDgI31Zg0ATbHkK3h',
};
