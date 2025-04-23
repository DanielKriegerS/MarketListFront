import { MarketListItem } from './MarketListItem';

export interface FinishedMarketList {
    id:string;
    description: string;
    items: MarketListItem[];
    finishDate: number;
    totalValue: number;
}
