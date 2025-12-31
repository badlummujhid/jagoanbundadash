import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    Calendar,
    FileText,
    Plus,
    Eye,
} from 'lucide-react';
import { useState } from 'react';

// ERD-aligned mock data
interface ScreeningListItem {
    id: number;
    child_id: number;
    child_name: string;
    parent_name: string;
    screening_date: string;
    age_at_screening_months: number;
    age_interval: string;
    status: 'in_progress' | 'completed' | 'cancelled';
    overall_status: 'sesuai' | 'pantau' | 'perlu_rujukan' | null;
    completed_at: string | null;
}

const mockScreenings: ScreeningListItem[] = [
    {
        id: 1,
        child_id: 1,
        child_name: 'Ahmad Fadli',
        parent_name: 'Budi Santoso',
        screening_date: '2024-12-28',
        age_at_screening_months: 33,
        age_interval: '33 Bulan',
        status: 'completed',
        overall_status: 'sesuai',
        completed_at: '2024-12-28 14:30:00',
    },
    {
        id: 2,
        child_id: 2,
        child_name: 'Siti Nurhaliza',
        parent_name: 'Dewi Sartika',
        screening_date: '2024-12-27',
        age_at_screening_months: 23,
        age_interval: '24 Bulan',
        status: 'completed',
        overall_status: 'pantau',
        completed_at: '2024-12-27 11:00:00',
    },
    {
        id: 3,
        child_id: 3,
        child_name: 'Rizky Pratama',
        parent_name: 'Andi Wijaya',
        screening_date: '2024-12-26',
        age_at_screening_months: 28,
        age_interval: '27 Bulan',
        status: 'completed',
        overall_status: 'perlu_rujukan',
        completed_at: '2024-12-26 15:45:00',
    },
    {
        id: 4,
        child_id: 4,
        child_name: 'Putri Ayu',
        parent_name: 'Siti Rahayu',
        screening_date: '2025-01-02',
        age_at_screening_months: 18,
        age_interval: '18 Bulan',
        status: 'in_progress',
        overall_status: null,
        completed_at: null,
    },
];

const statusFilters = [
    { label: 'Semua Status', value: 'all' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
];

const resultFilters = [
    { label: 'Semua Hasil', value: 'all' },
    { label: 'Sesuai', value: 'sesuai' },
    { label: 'Pantau', value: 'pantau' },
    { label: 'Perlu Rujukan', value: 'perlu_rujukan' },
];

function getStatusBadge(status: ScreeningListItem['status']) {
    const config = {
        in_progress: { label: 'In Progress', class: 'bg-blue-100 text-blue-700 border-blue-200' },
        completed: { label: 'Completed', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        cancelled: { label: 'Cancelled', class: 'bg-gray-100 text-gray-700 border-gray-200' },
    };

    const { label, class: className } = config[status];
    return <Badge className={className}>{label}</Badge>;
}

function getResultBadge(result: ScreeningListItem['overall_status']) {
    if (!result) {
        return <span className="text-muted-foreground text-sm">-</span>;
    }

    const config = {
        sesuai: { label: 'Sesuai', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        pantau: { label: 'Pantau', class: 'bg-amber-100 text-amber-700 border-amber-200' },
        perlu_rujukan: { label: 'Perlu Rujukan', class: 'bg-red-100 text-red-700 border-red-200' },
    };

    const { label, class: className } = config[result];
    return <Badge className={className}>{label}</Badge>;
}

export default function ScreeningsIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [resultFilter, setResultFilter] = useState('all');

    const filteredScreenings = mockScreenings.filter((screening) => {
        const matchesSearch = screening.child_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            screening.parent_name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || screening.status === statusFilter;
        const matchesResult = resultFilter === 'all' || screening.overall_status === resultFilter;

        return matchesSearch && matchesStatus && matchesResult;
    });

    return (
        <AppLayout title="ASQ-3 Screenings">
            <Head title="ASQ-3 Screenings" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">ASQ-3 Screenings</h1>
                        <p className="text-muted-foreground">Kelola screening perkembangan anak</p>
                    </div>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2">
                        <Plus className="h-4 w-4" />
                        Jadwalkan Screening
                    </Button>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari anak atau orang tua..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="w-48">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status Screening" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusFilters.map((filter) => (
                                        <SelectItem key={filter.value} value={filter.value}>
                                            {filter.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-48">
                            <Select value={resultFilter} onValueChange={setResultFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Hasil Screening" />
                                </SelectTrigger>
                                <SelectContent>
                                    {resultFilters.map((filter) => (
                                        <SelectItem key={filter.value} value={filter.value}>
                                            {filter.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Screenings Table */}
                <Card>
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-emerald-500" />
                            Daftar Screening ASQ-3
                            <Badge variant="secondary">{filteredScreenings.length} screening</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Anak</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Orang Tua</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usia</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tanggal</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Interval</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Hasil</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredScreenings.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-8 text-muted-foreground">
                                                Tidak ada data screening ditemukan.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredScreenings.map((screening) => (
                                            <tr key={screening.id} className="border-b hover:bg-muted/30 transition-colors">
                                                <td className="py-3 px-4">
                                                    <div className="font-medium">{screening.child_name}</div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {screening.parent_name}
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    {screening.age_at_screening_months} bulan
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        {new Date(screening.screening_date).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    {screening.age_interval}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {getStatusBadge(screening.status)}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {getResultBadge(screening.overall_status)}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <Link href={`/screenings/${screening.id}/results`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Lihat Hasil Detail">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-4 py-3 border-t">
                            <p className="text-sm text-muted-foreground">
                                Menampilkan {filteredScreenings.length} dari {mockScreenings.length} screening
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Sebelumnya
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Selanjutnya
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
