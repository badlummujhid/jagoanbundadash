import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Head, router, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash2, Search, Utensils } from 'lucide-react';
import { useState } from 'react';

interface Food {
    id: number;
    name: string;
    category: string | null;
    icon: string | null;
    serving_size: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    fiber: number | null;
    sugar: number | null;
    is_active: boolean;
    is_system: boolean;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface FoodsIndexProps {
    foods: PaginatedData<Food>;
    categories: string[];
    filters: {
        search?: string;
        category?: string;
        status?: string;
    };
}

export default function FoodsIndex({ foods, categories, filters }: FoodsIndexProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);
    const [searchValue, setSearchValue] = useState(filters.search || '');

    const addForm = useForm({
        name: '',
        category: '',
        serving_size: 100,
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        fiber: 0,
        sugar: 0,
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        category: '',
        serving_size: 100,
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        fiber: 0,
        sugar: 0,
        is_active: true,
    });

    const handleSearch = () => {
        router.get('/foods', { search: searchValue, category: filters.category, status: filters.status }, { preserveState: true });
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get('/foods', { ...filters, [key]: value === 'all' ? '' : value }, { preserveState: true });
    };

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addForm.post('/foods', {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                addForm.reset();
            },
        });
    };

    const handleEditOpen = (food: Food) => {
        setSelectedFood(food);
        editForm.setData({
            name: food.name,
            category: food.category || '',
            serving_size: food.serving_size,
            calories: food.calories,
            protein: food.protein,
            fat: food.fat,
            carbohydrate: food.carbohydrate,
            fiber: food.fiber || 0,
            sugar: food.sugar || 0,
            is_active: food.is_active,
        });
        setIsEditDialogOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFood) return;
        editForm.put(`/foods/${selectedFood.id}`, {
            onSuccess: () => {
                setIsEditDialogOpen(false);
                setSelectedFood(null);
            },
        });
    };

    const handleDeleteOpen = (food: Food) => {
        setSelectedFood(food);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!selectedFood) return;
        router.delete(`/foods/${selectedFood.id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setSelectedFood(null);
            },
        });
    };

    return (
        <AppLayout title="Kelola Makanan">
            <Head title="Kelola Makanan" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Kelola Makanan</h1>
                        <p className="text-muted-foreground">Kelola data master makanan untuk pencatatan nutrisi</p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2">
                                <Plus className="h-4 w-4" />
                                Tambah Makanan
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Tambah Makanan Baru</DialogTitle>
                                <DialogDescription>
                                    Masukkan data makanan baru untuk database nutrisi.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama Makanan *</Label>
                                        <Input
                                            id="name"
                                            value={addForm.data.name}
                                            onChange={(e) => addForm.setData('name', e.target.value)}
                                            placeholder="Nasi putih"
                                        />
                                        {addForm.errors.name && <p className="text-xs text-red-500">{addForm.errors.name}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Kategori</Label>
                                        <Input
                                            id="category"
                                            value={addForm.data.category}
                                            onChange={(e) => addForm.setData('category', e.target.value)}
                                            placeholder="Karbohidrat"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="serving_size">Porsi (gram) *</Label>
                                            <Input
                                                id="serving_size"
                                                type="number"
                                                value={addForm.data.serving_size}
                                                onChange={(e) => addForm.setData('serving_size', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="calories">Kalori (kkal) *</Label>
                                            <Input
                                                id="calories"
                                                type="number"
                                                value={addForm.data.calories}
                                                onChange={(e) => addForm.setData('calories', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="protein">Protein (g) *</Label>
                                            <Input
                                                id="protein"
                                                type="number"
                                                step="0.1"
                                                value={addForm.data.protein}
                                                onChange={(e) => addForm.setData('protein', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="fat">Lemak (g) *</Label>
                                            <Input
                                                id="fat"
                                                type="number"
                                                step="0.1"
                                                value={addForm.data.fat}
                                                onChange={(e) => addForm.setData('fat', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="carbohydrate">Karbohidrat (g) *</Label>
                                            <Input
                                                id="carbohydrate"
                                                type="number"
                                                step="0.1"
                                                value={addForm.data.carbohydrate}
                                                onChange={(e) => addForm.setData('carbohydrate', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="fiber">Serat (g)</Label>
                                            <Input
                                                id="fiber"
                                                type="number"
                                                step="0.1"
                                                value={addForm.data.fiber}
                                                onChange={(e) => addForm.setData('fiber', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="is_active"
                                            checked={addForm.data.is_active}
                                            onCheckedChange={(checked) => addForm.setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">Aktif</Label>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={addForm.processing}>
                                        {addForm.processing ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari makanan..."
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10"
                                    />
                                </div>
                                <Button onClick={handleSearch} variant="outline">
                                    Cari
                                </Button>
                            </div>
                            <Select value={filters.category || 'all'} onValueChange={(v) => handleFilterChange('category', v)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={filters.status || 'all'} onValueChange={(v) => handleFilterChange('status', v)}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Nonaktif</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2">
                            <Utensils className="h-5 w-5 text-emerald-500" />
                            Data Makanan
                            <Badge variant="secondary">{foods.total} item</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-4 py-3">Nama</TableHead>
                                    <TableHead className="px-4 py-3">Kategori</TableHead>
                                    <TableHead className="px-4 py-3 text-right">Kalori</TableHead>
                                    <TableHead className="px-4 py-3 text-right">Protein</TableHead>
                                    <TableHead className="px-4 py-3 text-right">Lemak</TableHead>
                                    <TableHead className="px-4 py-3 text-right">Karbo</TableHead>
                                    <TableHead className="px-4 py-3">Status</TableHead>
                                    <TableHead className="px-4 py-3 text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {foods.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            Tidak ada data makanan ditemukan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    foods.data.map((food) => (
                                        <TableRow key={food.id}>
                                            <TableCell className="px-4 font-medium">{food.name}</TableCell>
                                            <TableCell className="px-4">{food.category || '-'}</TableCell>
                                            <TableCell className="px-4 text-right">{food.calories} kkal</TableCell>
                                            <TableCell className="px-4 text-right">{food.protein}g</TableCell>
                                            <TableCell className="px-4 text-right">{food.fat}g</TableCell>
                                            <TableCell className="px-4 text-right">{food.carbohydrate}g</TableCell>
                                            <TableCell className="px-4">
                                                <Badge className={food.is_active ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-700 border-gray-200'}>
                                                    {food.is_active ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => handleEditOpen(food)}
                                                        className="h-8 w-8"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => handleDeleteOpen(food)}
                                                        className="h-8 w-8 text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>

                    {/* Pagination */}
                    {foods.last_page > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t">
                            <p className="text-sm text-muted-foreground">
                                Halaman {foods.current_page} dari {foods.last_page}
                            </p>
                            <div className="flex gap-1">
                                {foods.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        size="sm"
                                        variant={link.active ? 'default' : 'outline'}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Makanan</DialogTitle>
                        <DialogDescription>
                            Ubah data makanan yang ada.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit_name">Nama Makanan *</Label>
                                <Input
                                    id="edit_name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit_category">Kategori</Label>
                                <Input
                                    id="edit_category"
                                    value={editForm.data.category}
                                    onChange={(e) => editForm.setData('category', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit_serving_size">Porsi (gram)</Label>
                                    <Input
                                        id="edit_serving_size"
                                        type="number"
                                        value={editForm.data.serving_size}
                                        onChange={(e) => editForm.setData('serving_size', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit_calories">Kalori (kkal)</Label>
                                    <Input
                                        id="edit_calories"
                                        type="number"
                                        value={editForm.data.calories}
                                        onChange={(e) => editForm.setData('calories', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit_protein">Protein (g)</Label>
                                    <Input
                                        id="edit_protein"
                                        type="number"
                                        step="0.1"
                                        value={editForm.data.protein}
                                        onChange={(e) => editForm.setData('protein', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit_fat">Lemak (g)</Label>
                                    <Input
                                        id="edit_fat"
                                        type="number"
                                        step="0.1"
                                        value={editForm.data.fat}
                                        onChange={(e) => editForm.setData('fat', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit_carbohydrate">Karbohidrat (g)</Label>
                                    <Input
                                        id="edit_carbohydrate"
                                        type="number"
                                        step="0.1"
                                        value={editForm.data.carbohydrate}
                                        onChange={(e) => editForm.setData('carbohydrate', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit_fiber">Serat (g)</Label>
                                    <Input
                                        id="edit_fiber"
                                        type="number"
                                        step="0.1"
                                        value={editForm.data.fiber}
                                        onChange={(e) => editForm.setData('fiber', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="edit_is_active"
                                    checked={editForm.data.is_active}
                                    onCheckedChange={(checked) => editForm.setData('is_active', checked)}
                                />
                                <Label htmlFor="edit_is_active">Aktif</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Hapus Makanan</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus <strong>{selectedFood?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDeleteConfirm}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
