import { Category } from './Category';
import { User } from './User';

export interface UpdatedProduct {
  id: number;
  name: string;
  category: Category | undefined;
  user: User | undefined;
}
