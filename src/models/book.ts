import { BookData } from './types';

export class Book implements BookData {
  public readonly isbn: string;
  public readonly title: string;
  public readonly author: string;
  public readonly year: number;
  private _available: boolean;

  constructor(data: BookData) {
    this.isbn = data.isbn;
    this.title = data.title;
    this.author = data.author;
    this.year = data.year;
    this._available = true;
  }

  get available(): boolean {
    return this._available;
  }

  markAsBorrowed(): void {
    this._available = false;
  }

  markAsReturned(): void {
    this._available = true;
  }

  toJSON(): BookData & { available: boolean } {
    return {
      isbn: this.isbn,
      title: this.title,
      author: this.author,
      year: this.year,
      available: this._available
    };
  }
}