import { MarketListItem } from './MarketListItem';

export interface MarketList {
    id: string;
    description: string;
    items: MarketListItem[];
    createDate: string;
    totalValue: number;
  }