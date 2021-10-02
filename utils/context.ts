import { Category } from '@/entities/category';
import { SystemSettings } from '@/entities/systemSettings';
import { Tag } from '@/entities/tag';
import { createContext } from 'react';

export type AppContextType = {
  settings?: SystemSettings;
  tags?: Tag[];
  categories?: Category[];
};
const AppContext = createContext<AppContextType>({});

export default AppContext;
