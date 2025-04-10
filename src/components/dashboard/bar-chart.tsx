
import { BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  yFormatter?: (value: number) => string;
  color?: string;
  className?: string;
  height?: number;
}

export function BarChart({
  data,
  xKey,
  yKey,
  yFormatter,
  color = "hsl(var(--primary))",
  className,
  height = 300
}: BarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(var(--border), 0.5)" />
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={yFormatter}
          />
          <Tooltip content={<CustomTooltip formatter={yFormatter} />} />
          <Bar
            dataKey={yKey}
            fill={color}
            radius={[4, 4, 0, 0]}
            barSize={30}
            animationDuration={1000}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
  formatter
}: TooltipProps<number, string> & { formatter?: (value: number) => string }) {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;
    const formattedValue = formatter ? formatter(value) : value;

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm text-sm">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-semibold">{formattedValue}</p>
      </div>
    );
  }

  return null;
}
