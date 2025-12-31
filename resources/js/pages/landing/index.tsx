import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/components/layouts/landing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Activity,
    Apple,
    Brain,
    ClipboardCheck,
    Download,
    Star,
    Check,
    ArrowRight,
} from 'lucide-react';

const features = [
    {
        icon: Activity,
        title: 'Tracking Antropometri',
        description: 'Pantau berat badan, tinggi badan, dan lingkar kepala anak dengan standar WHO.',
        color: 'bg-blue-500',
    },
    {
        icon: Apple,
        title: 'Monitoring Nutrisi',
        description: 'Catat asupan makanan harian dan pastikan kebutuhan gizi anak terpenuhi.',
        color: 'bg-green-500',
    },
    {
        icon: Brain,
        title: 'Screening ASQ-3',
        description: 'Deteksi dini perkembangan anak dengan kuesioner terstandar internasional.',
        color: 'bg-purple-500',
    },
    {
        icon: ClipboardCheck,
        title: 'Program PMT',
        description: 'Kelola program pemberian makanan tambahan untuk anak yang membutuhkan.',
        color: 'bg-orange-500',
    },
];

const stats = [
    { value: '10,000+', label: 'Keluarga Terdaftar' },
    { value: '25,000+', label: 'Anak Terpantau' },
    { value: '500+', label: 'Tenaga Kesehatan' },
    { value: '100+', label: 'Puskesmas Mitra' },
];

const testimonials = [
    {
        name: 'Ibu Dewi',
        role: 'Orang Tua',
        content: 'Aplikasi ini sangat membantu saya memantau tumbuh kembang anak. Fitur screening ASQ-3 nya lengkap sekali!',
        rating: 5,
    },
    {
        name: 'Bidan Sari',
        role: 'Tenaga Kesehatan',
        content: 'Dashboard untuk Nakes sangat memudahkan kami memantau status gizi anak-anak di wilayah binaan.',
        rating: 5,
    },
    {
        name: 'Ibu Rina',
        role: 'Orang Tua',
        content: 'Suka banget dengan fitur reminder untuk jadwal imunisasi dan pemeriksaan rutin.',
        rating: 5,
    },
];

// User avatars for social proof
const userAvatars = [
    { name: 'User 1', color: 'bg-blue-500' },
    { name: 'User 2', color: 'bg-emerald-500' },
    { name: 'User 3', color: 'bg-purple-500' },
];

export default function LandingIndex() {
    return (
        <LandingLayout>
            <Head title="JagoanBunda - Monitoring Tumbuh Kembang Anak" />

            {/* Hero Section - Matching the reference design */}
            <section className="relative overflow-hidden min-h-[90vh] flex items-center">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20" />

                {/* Decorative circles */}
                <div className="absolute top-20 right-1/3 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

                <div className="container px-4 mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-4 lg:gap-2 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-2 text-sm font-medium">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                #1 HEALTH APP FOR KIDS
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                                Monitor Tumbuh Kembang Anak dengan{' '}
                                <span className="text-emerald-500">Mudah</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg text-gray-600 max-w-lg">
                                Pantau kesehatan, nutrisi, dan perkembangan si kecil dalam satu aplikasi terpadu.
                                Dapatkan analisis akurat dan rekomendasi medis terpercaya.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Link href="/download">
                                    <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-base rounded-xl">
                                        <Download className="h-5 w-5" />
                                        Download App
                                    </Button>
                                </Link>
                                <Link href="/#features">
                                    <Button size="lg" variant="outline" className="gap-2 px-6 py-6 text-base rounded-xl border-2">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {userAvatars.map((avatar, i) => (
                                        <div
                                            key={i}
                                            className={`h-10 w-10 rounded-full ${avatar.color} border-2 border-white flex items-center justify-center text-white text-sm font-medium`}
                                        >
                                            {avatar.name.charAt(0)}
                                        </div>
                                    ))}
                                    <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                                        +2k
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600">
                                    Bergabung dengan orang tua lainnya
                                </span>
                            </div>
                        </div>

                        {/* Right Content - Phone Mockup */}
                        <div className="relative flex justify-center lg:justify-start lg:pl-8 mt-12">
                            {/* Phone Frame */}
                            <div className="relative">
                                {/* Phone outer frame */}
                                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                    {/* Phone notch */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

                                    {/* Screenshot */}
                                    <div className="relative rounded-[2.5rem] overflow-hidden bg-white w-[280px] sm:w-[320px]">
                                        <img
                                            src="/images/app-screenshot.png"
                                            alt="JagoanBunda App Screenshot"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>

                                {/* Floating Status Card */}
                                <div className="absolute -bottom-4 -left-8 sm:-left-16 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border">
                                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Check className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Status Gizi</p>
                                        <p className="font-semibold text-gray-900">Gizi Baik</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">Fitur Unggulan</Badge>
                        <h2 className="text-3xl font-bold mb-4">Semua yang Anda Butuhkan</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Fitur lengkap untuk memantau tumbuh kembang anak dalam satu aplikasi.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                                <CardContent className="p-6">
                                    <div className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 text-white`}>
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-500 text-white">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Dipercaya oleh Ribuan Keluarga Indonesia</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                                <p className="text-white/80">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">Testimonial</Badge>
                        <h2 className="text-3xl font-bold mb-4">Apa Kata Mereka?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-md">
                                <CardContent className="p-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-medium">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <Card className="bg-gradient-to-r from-blue-600 to-emerald-500 border-0 overflow-hidden">
                        <CardContent className="p-12 text-center text-white relative">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4">Mulai Pantau Tumbuh Kembang Anak Anda</h2>
                                <p className="text-white/90 max-w-2xl mx-auto mb-8">
                                    Download aplikasi JagoanBunda sekarang dan bergabung dengan ribuan keluarga Indonesia
                                    yang telah mempercayakan pemantauan tumbuh kembang anak mereka.
                                </p>
                                <Link href="/download">
                                    <Button size="lg" variant="secondary" className="gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-base rounded-xl">
                                        <Download className="h-5 w-5" />
                                        Download Gratis
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </LandingLayout>
    );
}
