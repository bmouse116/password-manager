export interface PasswordTag {
  text: string;
}

export interface PasswordEntry {
  id: string;
  name: string;
  login: string;
  password: string;
  url?: string;
  tags?: PasswordTag[]; 
  comment?: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}


export const SortTypes = {
  NONE: '',
  NEW: 'new',
  FAVORITE: 'favorite',
  OLD: 'old'
} as const;

export type SortTypes = typeof SortTypes[keyof typeof SortTypes]