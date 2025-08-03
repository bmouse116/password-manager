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
