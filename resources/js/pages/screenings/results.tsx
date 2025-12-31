import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Calendar,
    User,
    Baby,
    CheckCircle,
    AlertTriangle,
    XCircle,
    MessageCircle,
    Activity,
    Hand,
    Puzzle,
    Users,
    FileText,
    Download,
} from 'lucide-react';

// Mock data - would come from backend
const screeningData = {
    id: 1,
    child: {
        id: 1,
        name: 'Ahmad Fadli',
        age_months: 27,
        date_of_birth: '2022-08-10',
    },
    parent: {
        full_name: 'Budi Santoso',
        phone: '+6281234567890',
    },
    screening_date: '2024-12-28',
    age_at_screening_months: 27,
    age_interval: '27 Bulan',
    status: 'completed' as const,
    overall_status: 'sesuai' as const,
    completed_at: '2024-12-28 14:30:00',
};

const domainResults = [
    {
        id: 1,
        domain_code: 'communication',
        domain_name: 'Komunikasi',
        icon: MessageCircle,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        total_score: 55,
        cutoff_score: 30,
        monitoring_score: 40,
        max_score: 60,
        status: 'sesuai' as const,
    },
    {
        id: 2,
        domain_code: 'gross_motor',
        domain_name: 'Motorik Kasar',
        icon: Activity,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        total_score: 60,
        cutoff_score: 25,
        monitoring_score: 35,
        max_score: 60,
        status: 'sesuai' as const,
    },
    {
        id: 3,
        domain_code: 'fine_motor',
        domain_name: 'Motorik Halus',
        icon: Hand,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        total_score: 50,
        cutoff_score: 30,
        monitoring_score: 40,
        max_score: 60,
        status: 'sesuai' as const,
    },
    {
        id: 4,
        domain_code: 'problem_solving',
        domain_name: 'Pemecahan Masalah',
        icon: Puzzle,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        total_score: 55,
        cutoff_score: 25,
        monitoring_score: 35,
        max_score: 60,
        status: 'sesuai' as const,
    },
    {
        id: 5,
        domain_code: 'personal_social',
        domain_name: 'Personal Sosial',
        icon: Users,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        total_score: 50,
        cutoff_score: 30,
        monitoring_score: 40,
        max_score: 60,
        status: 'sesuai' as const,
    },
];

function getStatusBadge(status: string) {
    const config = {
        sesuai: {
            label: 'Perkembangan Sesuai',
            className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            icon: CheckCircle,
        },
        pantau: {
            label: 'Perlu Pemantauan',
            className: 'bg-amber-100 text-amber-700 border-amber-200',
            icon: AlertTriangle,
        },
        perlu_rujukan: {
            label: 'Perlu Rujukan',
            className: 'bg-red-100 text-red-700 border-red-200',
            icon: XCircle,
        },
    };

    const { label, className, icon: Icon } = config[status as keyof typeof config];
    return (
        <Badge className={`${className} gap-2 px-3 py-1 text-sm`}>
            <Icon className="h-4 w-4" />
            {label}
        </Badge>
    );
}

function getDomainStatusBadge(status: string) {
    const config = {
        sesuai: { label: 'Sesuai', className: 'bg-emerald-100 text-emerald-700' },
        pantau: { label: 'Pantau', className: 'bg-amber-100 text-amber-700' },
        perlu_rujukan: { label: 'Perlu Rujukan', className: 'bg-red-100 text-red-700' },
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
}

export default function ScreeningResults() {
    const totalScore = domainResults.reduce((sum, d) => sum + d.total_score, 0);
    const maxTotalScore = domainResults.reduce((sum, d) => sum + d.max_score, 0);
    const overallProgress = (totalScore / maxTotalScore) * 100;

    return (
        <AppLayout title="Hasil Screening ASQ-3">
            <Head title="Hasil Screening ASQ-3" />

            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <Link href="/screenings">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Unduh PDF
                    </Button>
                </div>

                {/* Screening Info */}
                <Card>
                    <CardHeader className="border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl mb-2">Hasil Screening ASQ-3</CardTitle>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {new Date(screeningData.screening_date).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                            {getStatusBadge(screeningData.overall_status)}
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Baby className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nama Anak</p>
                                        <p className="font-semibold">{screeningData.child.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Orang Tua</p>
                                        <p className="font-semibold">{screeningData.parent.full_name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Usia saat Screening</p>
                                    <p className="font-semibold">{screeningData.age_at_screening_months} bulan ({screeningData.age_interval})</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <p className="font-semibold capitalize">{screeningData.status}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Overall Score */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skor Keseluruhan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Total Skor</span>
                                <span className="font-semibold">{totalScore} / {maxTotalScore}</span>
                            </div>
                            <Progress value={overallProgress} className="h-3" />
                            <p className="text-xs text-muted-foreground text-center">
                                {overallProgress.toFixed(1)}% dari skor maksimal
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Domain Results */}
                <Card>
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Hasil per Domain
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {domainResults.map((domain) => {
                                const DomainIcon = domain.icon;
                                const progress = (domain.total_score / domain.max_score) * 100;

                                return (
                                    <div key={domain.id} className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-3 rounded-lg ${domain.bgColor}`}>
                                                    <DomainIcon className={`h-6 w-6 ${domain.color}`} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{domain.domain_name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Skor: {domain.total_score} / {domain.max_score}
                                                    </p>
                                                </div>
                                            </div>
                                            {getDomainStatusBadge(domain.status)}
                                        </div>

                                        <div className="space-y-2">
                                            <Progress value={progress} className="h-2" />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Cutoff: {domain.cutoff_score}</span>
                                                <span>Monitoring: {domain.monitoring_score}</span>
                                                <span>Max: {domain.max_score}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                    <CardHeader className="border-b">
                        <CardTitle>Rekomendasi</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="prose prose-sm max-w-none">
                            <p className="text-muted-foreground">
                                Berdasarkan hasil screening ASQ-3, perkembangan anak menunjukkan hasil yang sesuai dengan usia.
                                Terus lakukan stimulasi sesuai usia dan pantau perkembangan anak secara berkala.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li>Lakukan screening ulang pada usia berikutnya sesuai interval ASQ-3</li>
                                <li>Berikan stimulasi yang sesuai untuk setiap domain perkembangan</li>
                                <li>Konsultasikan dengan tenaga kesehatan jika ada kekhawatiran</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
