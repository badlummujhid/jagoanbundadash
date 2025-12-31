import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    Eye,
    Edit,
    Filter,
    Grid,
    List,
} from 'lucide-react';
import { useState } from 'react';
import type { Child } from '@/types/models';

// Mock data
const mockChildren: Child[] = [
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
        parent: { id: 1, email: 'budi@email.com', full_name: 'Budi Santoso', created_at: '', updated_at: '' },
        latest_measurement: {
            id: 1,
            child_id: 1,
            measurement_date: '2024-12-28',
            weight: 12.5,
            height: 92,
            weight_for_age_zscore: 0.5,
            height_for_age_zscore: 0.3,
            nutritional_status: 'normal',
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
        parent: { id: 2, email: 'dewi@email.com', full_name: 'Dewi Sartika', created_at: '', updated_at: '' },
        latest_measurement: {
            id: 2,
            child_id: 2,
            measurement_date: '2024-12-27',
            weight: 9.8,
            height: 82,
            weight_for_age_zscore: -2.1,
            height_for_age_zscore: -0.5,
            nutritional_status: 'underweight',
            stunting_status: 'normal',
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
        parent: { id: 3, email: 'andi@email.com', full_name: 'Andi Wijaya', created_at: '', updated_at: '' },
        latest_measurement: {
            id: 3,
            child_id: 3,
            measurement_date: '2024-12-26',
            weight: 10.2,
            height: 83,
            weight_for_age_zscore: -0.3,
            height_for_age_zscore: -2.5,
            nutritional_status: 'normal',
            stunting_status: 'stunted',
            created_at: '2024-12-26',
        },
    },
    {
        id: 4,
        user_id: 4,
        name: 'Putri Ayu',
        date_of_birth: '2023-06-05',
        gender: 'female',
        is_active: true,
        created_at: '2024-04-01',
        updated_at: '2024-12-30',
        age_months: 18,
        parent: { id: 4, email: 'siti@email.com', full_name: 'Siti Rahayu', created_at: '', updated_at: '' },
        latest_measurement: {
            id: 4,
            child_id: 4,
            measurement_date: '2024-12-25',
            weight: 9.5,
            height: 78,
            weight_for_age_zscore: 0.8,
            height_for_age_zscore: 0.2,
            nutritional_status: 'normal',
            stunting_status: 'normal',
            created_at: '2024-12-25',
        },
    },
];

const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Normal', value: 'normal' },
    { label: 'Underweight', value: 'underweight' },
    { label: 'Stunted', value: 'stunted' },
    { label: 'At Risk', value: 'at-risk' },
];

function ZScoreIndicator({ value }: { value: number | undefined }) {
    if (value === undefined) return <span className="text-muted-foreground">-</span>;

    const position = Math.max(0, Math.min(100, ((value + 3) / 6) * 100));
    const isNormal = value >= -2 && value <= 2;
    const isSevere = value < -3 || value > 3;

    return (
        <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full relative">
                <div
                    className={`absolute h-3 w-3 rounded-full -top-0.5 transform -translate-x-1/2 ${isSevere ? 'bg-red-500' : isNormal ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                    style={{ left: `${position}%` }}
                />
            </div>
            <span className={`text-xs font-semibold ${isSevere ? 'text-red-600' : isNormal ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                {value > 0 ? '+' : ''}{value.toFixed(1)}
            </span>
        </div>
    );
}

function getStatusBadge(child: Child) {
    const measurement = child.latest_measurement;
    if (!measurement) return null;

    const statuses = [];
    if (measurement.nutritional_status && measurement.nutritional_status !== 'normal') {
        statuses.push(measurement.nutritional_status);
    }
    if (measurement.stunting_status && measurement.stunting_status !== 'normal') {
        statuses.push(measurement.stunting_status);
    }
    if (measurement.wasting_status && measurement.wasting_status !== 'normal') {
        statuses.push(measurement.wasting_status);
    }

    if (statuses.length === 0) {
        return (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Normal
            </span>
        );
    }

    const status = statuses[0];
    const isSevere = status.includes('severely');
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${isSevere ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
            }`}>
            {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
    );
}

export default function ChildrenIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

    const filteredChildren = mockChildren.filter((child) => {
        const matchesSearch = child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            child.parent?.full_name.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === 'all') return matchesSearch;
        if (activeFilter === 'at-risk') {
            const m = child.latest_measurement;
            return matchesSearch && m && (
                (m.weight_for_age_zscore && m.weight_for_age_zscore < -2) ||
                (m.height_for_age_zscore && m.height_for_age_zscore < -2) ||
                (m.weight_for_height_zscore && m.weight_for_height_zscore < -2)
            );
        }
        return matchesSearch && child.latest_measurement?.nutritional_status === activeFilter;
    });

    return (
        <AppLayout title="Children Management">
            <Head title="Children Management" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search children or parents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 ${viewMode === 'table' ? 'bg-muted' : ''}`}
                            >
                                <List className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                        </div>
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.value
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Children Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Parent</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Age</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Weight/Height</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Z-Score (WAZ)</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Checkup</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredChildren.map((child) => (
                                        <tr key={child.id} className="border-b hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${child.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                                                        }`}>
                                                        <span className="text-sm font-medium">
                                                            {child.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">{child.name}</span>
                                                        <p className="text-xs text-muted-foreground capitalize">{child.gender}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {child.parent?.full_name}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                {child.age_months} mo
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                {child.latest_measurement ? (
                                                    <span>
                                                        {child.latest_measurement.weight} kg / {child.latest_measurement.height} cm
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <ZScoreIndicator value={child.latest_measurement?.weight_for_age_zscore} />
                                            </td>
                                            <td className="py-3 px-4">
                                                {getStatusBadge(child)}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {child.latest_measurement?.measurement_date ? (
                                                    new Date(child.latest_measurement.measurement_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                    })
                                                ) : '-'}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1">
                                                    <Link href={`/children/${child.id}`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/children/${child.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-4 py-3 border-t">
                            <p className="text-sm text-muted-foreground">
                                Showing {filteredChildren.length} of {mockChildren.length} children
                            </p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
