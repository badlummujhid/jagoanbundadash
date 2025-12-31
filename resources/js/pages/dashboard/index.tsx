import { Head } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    Baby,
    AlertTriangle,
    ClipboardList,
    TrendingUp,
    TrendingDown,
    ArrowRight,
} from 'lucide-react';
import type { DashboardStats, Child } from '@/types/models';

// Mock data for development
const mockStats: DashboardStats = {
    total_parents: 1234,
    total_children: 3456,
    at_risk_children: 234,
    active_pmt_programs: 89,
    nutritional_distribution: {
        normal: 78,
        underweight: 12,
        stunted: 7,
        wasted: 3,
    },
    recent_screenings: [],
    children_requiring_attention: [],
};

const mockChildrenAtRisk: Child[] = [
    {
        id: 1,
        user_id: 1,
        name: 'Ahmad Fadli',
        date_of_birth: '2022-03-15',
        gender: 'male',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-12-30',
        age_months: 33,
        parent: { id: 1, email: 'parent1@email.com', full_name: 'Budi Santoso', created_at: '', updated_at: '' },
        latest_measurement: {
            id: 1,
            child_id: 1,
            measurement_date: '2024-12-28',
            weight: 10.5,
            height: 85,
            weight_for_age_zscore: -2.5,
            nutritional_status: 'underweight',
            stunting_status: 'normal',
            created_at: '2024-12-28',
        },
    },
    {
        id: 2,
        user_id: 2,
        name: 'Siti Nurhaliza',
        date_of_birth: '2023-01-20',
        gender: 'female',
        is_active: true,
        created_at: '2024-02-01',
        updated_at: '2024-12-30',
        age_months: 23,
        parent: { id: 2, email: 'parent2@email.com', full_name: 'Dewi Sartika', created_at: '', updated_at: '' },
        latest_measurement: {
            id: 2,
            child_id: 2,
            measurement_date: '2024-12-27',
            weight: 8.2,
            height: 75,
            height_for_age_zscore: -2.8,
            nutritional_status: 'normal',
            stunting_status: 'stunted',
            created_at: '2024-12-27',
        },
    },
    {
        id: 3,
        user_id: 3,
        name: 'Rizky Pratama',
        date_of_birth: '2022-08-10',
        gender: 'male',
        is_active: true,
        created_at: '2024-03-01',
        updated_at: '2024-12-30',
        age_months: 28,
        parent: { id: 3, email: 'parent3@email.com', full_name: 'Andi Wijaya', created_at: '', updated_at: '' },
        latest_measurement: {
            id: 3,
            child_id: 3,
            measurement_date: '2024-12-26',
            weight: 9.0,
            height: 80,
            weight_for_height_zscore: -3.1,
            nutritional_status: 'underweight',
            wasting_status: 'severely_wasted',
            created_at: '2024-12-26',
        },
    },
];

const recentActivities = [
    { id: 1, type: 'screening', text: 'ASQ-3 screening completed for Ahmad Fadli', time: '2 hours ago' },
    { id: 2, type: 'measurement', text: 'New measurement recorded for Siti Nurhaliza', time: '3 hours ago' },
    { id: 3, type: 'pmt', text: 'PMT program started for 5 children', time: '5 hours ago' },
    { id: 4, type: 'parent', text: 'New parent registered: Dewi Lestari', time: '1 day ago' },
];

function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = 'primary',
}: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: 'primary' | 'secondary' | 'destructive' | 'accent';
}) {
    const colorClasses = {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        destructive: 'bg-destructive/10 text-destructive',
        accent: 'bg-accent/10 text-accent',
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
                        {trend && trendValue && (
                            <div className="flex items-center gap-1 mt-1">
                                {trend === 'up' ? (
                                    <TrendingUp className="h-4 w-4 text-secondary" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-destructive" />
                                )}
                                <span className={`text-xs ${trend === 'up' ? 'text-secondary' : 'text-destructive'}`}>
                                    {trendValue}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={`h-12 w-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function NutritionalStatusChart({ data }: { data: DashboardStats['nutritional_distribution'] }) {
    const segments = [
        { label: 'Normal', value: data.normal, color: 'bg-secondary' },
        { label: 'Underweight', value: data.underweight, color: 'bg-accent' },
        { label: 'Stunted', value: data.stunted, color: 'bg-orange-500' },
        { label: 'Wasted', value: data.wasted, color: 'bg-destructive' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
                {segments.map((segment, index) => (
                    <div
                        key={index}
                        className={`${segment.color} transition-all`}
                        style={{ width: `${segment.value}%` }}
                    />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
                {segments.map((segment, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${segment.color}`} />
                        <span className="text-sm text-muted-foreground">
                            {segment.label}: {segment.value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getStatusBadge(status: string | undefined) {
    const statusConfig: Record<string, { label: string; class: string }> = {
        normal: { label: 'Normal', class: 'bg-emerald-100 text-emerald-700' },
        underweight: { label: 'Underweight', class: 'bg-amber-100 text-amber-700' },
        stunted: { label: 'Stunted', class: 'bg-orange-100 text-orange-700' },
        severely_stunted: { label: 'Severely Stunted', class: 'bg-red-100 text-red-700' },
        wasted: { label: 'Wasted', class: 'bg-orange-100 text-orange-700' },
        severely_wasted: { label: 'Severely Wasted', class: 'bg-red-100 text-red-700' },
        overweight: { label: 'Overweight', class: 'bg-amber-100 text-amber-700' },
        obese: { label: 'Obese', class: 'bg-red-100 text-red-700' },
    };

    const config = statusConfig[status || 'normal'] || statusConfig.normal;
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${config.class}`}>
            {config.label}
        </span>
    );
}

export default function Dashboard() {
    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Parents"
                        value={mockStats.total_parents}
                        icon={Users}
                        trend="up"
                        trendValue="+12% from last month"
                        color="primary"
                    />
                    <StatCard
                        title="Total Children"
                        value={mockStats.total_children}
                        icon={Baby}
                        trend="up"
                        trendValue="+8% from last month"
                        color="secondary"
                    />
                    <StatCard
                        title="At Risk Children"
                        value={mockStats.at_risk_children}
                        icon={AlertTriangle}
                        trend="down"
                        trendValue="-5% from last month"
                        color="destructive"
                    />
                    <StatCard
                        title="Active PMT Programs"
                        value={mockStats.active_pmt_programs}
                        icon={ClipboardList}
                        color="accent"
                    />
                </div>

                {/* Charts and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Nutritional Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Nutritional Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <NutritionalStatusChart data={mockStats.nutritional_distribution} />
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Activity</CardTitle>
                            <Button variant="ghost" size="sm">
                                View all <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                                        <div className="flex-1">
                                            <p className="text-sm">{activity.text}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Children Requiring Attention */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Children Requiring Attention</CardTitle>
                        <Button variant="outline" size="sm">
                            View all <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Name</th>
                                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Age</th>
                                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Parent</th>
                                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Last Checkup</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockChildrenAtRisk.map((child) => (
                                        <tr key={child.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-xs font-medium text-primary">
                                                            {child.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium">{child.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-sm text-muted-foreground">
                                                {child.age_months} months
                                            </td>
                                            <td className="py-3 px-2 text-sm text-muted-foreground">
                                                {child.parent?.full_name}
                                            </td>
                                            <td className="py-3 px-2">
                                                {getStatusBadge(child.latest_measurement?.nutritional_status || child.latest_measurement?.stunting_status || child.latest_measurement?.wasting_status)}
                                            </td>
                                            <td className="py-3 px-2 text-sm text-muted-foreground">
                                                {child.latest_measurement?.measurement_date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
