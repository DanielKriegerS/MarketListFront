import { MarketListItem } from './MarketListItem';

export interface MarketList {
    id: string;
    description: string;
    items: MarketListItem[];
    date: string;
    totalValue: number;
    isFinished: boolean;
  }