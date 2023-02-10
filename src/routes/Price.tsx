import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

interface PriceProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const ColumnPrice = styled.div`
  text-align: center;
  float: left;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  ul: {
    display: table;
  }
  li: {
    display: table-cell;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 60000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <>
          <ColumnPrice>
            <ul>
              <li>고가</li>
              {data?.map((price) => (
                <li>{parseFloat(price.high)}</li>
              ))}
            </ul>
          </ColumnPrice>
          <ColumnPrice>
            <ul>
              <li>저가</li>
              {data?.map((price) => (
                <li>{parseFloat(price.low)}</li>
              ))}
            </ul>
          </ColumnPrice>
        </>
      )}
    </div>
  );
}
export default Price;
