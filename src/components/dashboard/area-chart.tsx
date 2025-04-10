
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  yFormatter?: (value: number) => string;
  stroke?: string;
  fill?: string;
  className?: string;
  height?: number;
}

export function AreaChart({ 
  data, 
  xKey, 
  yKey, 
  yFormatter, 
  stroke = "hsl(var(--primary))", 
  fill = "hsla(var(--primary), 0.2)", 
  className,
  height = 300
}: AreaChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fill} stopOpacity={0.8} />
              <stop offset="95%" stopColor={fill} stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area 
            type="monotone" 
            dataKey={yKey} 
            stroke={stroke} 
            strokeWidth={2}
            fill="url(#colorGradient)" 
            activeDot={{ r: 6, strokeWidth: 0, fill: stroke }}
          />
        </RechartsAreaChart>
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
