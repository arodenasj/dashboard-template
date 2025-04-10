
import { Clock, MessageSquare, Package, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string | number;
  title: string;
  time: string;
  icon: 'message' | 'user' | 'order' | 'product' | 'task';
  description?: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  className?: string;
}

export function RecentActivities({ activities, className }: RecentActivitiesProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
        <button className="text-xs text-primary hover:underline">View all</button>
      </div>
      
      <div className="space-y-1">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 rounded-md p-3 transition-all hover:bg-accent">
            <div className="rounded-full bg-primary/10 p-2">
              {activity.icon === 'message' && <MessageSquare className="h-4 w-4 text-primary" />}
              {activity.icon === 'user' && <User className="h-4 w-4 text-primary" />}
              {activity.icon === 'order' && <ShoppingCart className="h-4 w-4 text-primary" />}
              {activity.icon === 'product' && <Package className="h-4 w-4 text-primary" />}
              {activity.icon === 'task' && <Clock className="h-4 w-4 text-primary" />}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              {activity.description && (
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
