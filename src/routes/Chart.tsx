import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
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
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: Array.isArray(data)
                ? data?.map((price) => ({
                    x: new Date(price.time_close * 1000).toISOString(),
                    y: [
                      parseFloat(price.open),
                      parseFloat(price.high),
                      parseFloat(price.low),
                      parseFloat(price.close),
                    ],
                  }))
                : [],
            },
          ]}
          options={{
            title: { text: "CandleStick Chart" },
            theme: {
              mode: "dark",
            },
            grid: {
              show: true,
              strokeDashArray: 2,
            },
            chart: {
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              labels: {
                show: true,
                formatter: (value) => {
                  return value.toFixed(0);
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
