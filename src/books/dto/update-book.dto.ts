export class UpdateBookDto{ 
  readonly title?: string;
  readonly author?: string;
  readonly description?: string;
  readonly category?: string;
  readonly publishedYear?: number;
  readonly available?: boolean;
}