import { createContext } from 'react';
import { Category } from '@/entities/category';
import { SystemSettings } from '@/entities/systemSettings';
import { Tag } from '@/entities/tag';

export type AppContextType = {
  settings?: SystemSettings;
  tags?: Tag[];
  categories?: Category[];
};
const AppContext = createContext<AppContextType>({});
AppContext.displayName = 'AppContext';

export default AppContext;
