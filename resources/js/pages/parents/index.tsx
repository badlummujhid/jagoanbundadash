import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    Plus,
    Eye,
    Edit,
    MoreHorizontal,
    Mail,
    Phone,
    CheckCircle,
    Clock,
} from 'lucide-react';
import { useState } from 'react';
import type { User } from '@/types/models';

// Mock data
const mockParents: (User & { children_count: number; status: 'verified' | 'pending' })[] = [
    {
        id: 1,
        email: 'budi.santoso@email.com',
        full_name: 'Budi Santoso',
        phone: '+6281234567890',
        children_count: 2,
        status: 'verified',
        created_at: '2024-01-15',
        updated_at: '2024-12-30',
    },
    {
        id: 2,
        email: 'dewi.sartika@email.com',
        full_name: 'Dewi Sartika',
        phone: '+6282345678901',
        children_count: 1,
        status: 'verified',
        created_at: '2024-02-20',
        updated_at: '2024-12-30',
    },
    {
        id: 3,
        email: 'andi.wijaya@email.com',
        full_name: 'Andi Wijaya',
        phone: '+6283456789012',
        children_count: 3,
        status: 'pending',
        created_at: '2024-03-10',
        updated_at: '2024-12-30',
    },
    {
        id: 4,
        email: 'siti.rahayu@email.com',
        full_name: 'Siti Rahayu',
        phone: '+6284567890123',
        children_count: 1,
        status: 'verified',
        created_at: '2024-04-05',
        updated_at: '2024-12-30',
    },
    {
        id: 5,
        email: 'agus.hermawan@email.com',
        full_name: 'Agus Hermawan',
        phone: '+6285678901234',
        children_count: 2,
        status: 'verified',
        created_at: '2024-05-12',
        updated_at: '2024-12-30',
    },
];

const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Verified', value: 'verified' },
    { label: 'Pending', value: 'pending' },
    { label: 'Has At-Risk Children', value: 'at-risk' },
];

export default function ParentsIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredParents = mockParents.filter((parent) => {
        const matchesSearch = parent.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            parent.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || parent.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <AppLayout title="Parents Management">
            <Head title="Parents Management" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search parents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Parent
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {filterOptions.map((filter) => (
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

                {/* Parents Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Children</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Registered</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParents.map((parent) => (
                                        <tr key={parent.id} className="border-b hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-primary">
                                                            {parent.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium">{parent.full_name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Mail className="h-4 w-4" />
                                                    {parent.email}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Phone className="h-4 w-4" />
                                                    {parent.phone}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                                                    {parent.children_count}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                {parent.status === 'verified' ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                                                        <CheckCircle className="h-3 w-3" />
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                                                        <Clock className="h-3 w-3" />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {new Date(parent.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Link href={`/parents/${parent.id}`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/parents/${parent.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
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
                                Showing {filteredParents.length} of {mockParents.length} parents
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
