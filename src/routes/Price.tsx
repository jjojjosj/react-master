import styled from "styled-components";
import { Overview, OverviewItem } from "./Coin";

interface PriceProps {
  coinId: string;
  priceQuotesUSD?: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

function Price({ coinId, priceQuotesUSD }: PriceProps) {
  return (
    <div>
      <Overview>
        <OverviewItem>
          <span>Change_1h</span>
          <span>{priceQuotesUSD?.percent_change_1h}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Change_6h</span>
          <span>{priceQuotesUSD?.percent_change_6h}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Change_12h</span>
          <span>{priceQuotesUSD?.percent_change_12h}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Change_24h</span>
          <span>{priceQuotesUSD?.percent_change_24h}</span>
        </OverviewItem>
      </Overview>
    </div>
  );
}
export default Price;
