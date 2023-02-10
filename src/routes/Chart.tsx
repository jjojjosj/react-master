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
          type="line"
          series={[
            {
              name: "Price",
              data: Array.isArray(data)
                ? data?.map((price) => parseFloat(price.close)) ?? []
                : [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: true,
              borderColor: "#ffffff",
              strokeDashArray: 2,
              xaxis: {
                lines: {
                  show: false,
                },
              },
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              axisBorder: {
                show: true,
                color: "#ffffff",
                offsetX: 0,
                offsetY: 0,
              },
              axisTicks: {
                show: true,
                borderType: "solid",
                color: "#ffffff",
                height: 6,
                offsetX: 0,
                offsetY: 0,
              },
              labels: {
                datetimeFormatter: {
                  year: "yyyy",
                  month: "yy MM",
                  day: "MM/dd",
                  hour: "HH:mm",
                },
              },
              type: "datetime",
              categories: Array.isArray(data)
                ? data?.map((price) =>
                    new Date(price.time_close * 1000).toISOString()
                  ) ?? []
                : [],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
            yaxis: {
              axisBorder: {
                show: true,
                color: "#ffffff",
                offsetX: 0,
                offsetY: 0,
              },
              axisTicks: {
                show: true,
                color: "#ffffff",
                offsetX: 0,
                offsetY: 0,
              },
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
