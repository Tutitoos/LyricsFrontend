export interface LyricsItem {
  ref: string;
  key: string;
  value: string;
}

export interface LyricsApiResponse {
  data: LyricsItem[];
}

export interface SearchFilters {
  query: string;
}
