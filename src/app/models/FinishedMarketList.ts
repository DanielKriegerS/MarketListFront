import { MarketListItem } from './MarketListItem';

export interface FinishedMarketList {
    id:string;
    description: string;
    items: MarketListItem[];
    finishDate: string;
    totalValue: number;
}
