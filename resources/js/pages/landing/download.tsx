import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/components/layouts/landing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import {
    Download,
    Smartphone,
    QrCode,
    Shield,
    Bell,
    Activity,
    ChevronLeft,
    ChevronRight,
    Check,
    Star,
    ArrowRight,
} from 'lucide-react';

// All available screenshots
const screenshots = [
    { src: '/images/home.png', alt: 'Beranda Aplikasi', title: 'Dashboard Utama' },
    { src: '/images/progress.png', alt: 'Progres Pertumbuhan', title: 'Progres Anak' },
    { src: '/images/anthropometry_history.png', alt: 'Riwayat Antropometri', title: 'Riwayat Pengukuran' },
    { src: '/images/anthropometry_input.png', alt: 'Input Antropometri', title: 'Input Data' },
    { src: '/images/food_input.png', alt: 'Input Makanan', title: 'Catat Nutrisi' },
    { src: '/images/pmt_index.png', alt: 'Program PMT', title: 'Program PMT' },
    { src: '/images/pmt_history.png', alt: 'Riwayat PMT', title: 'Riwayat PMT' },
    { src: '/images/pmt_report.png', alt: 'Laporan PMT', title: 'Laporan PMT' },
    { src: '/images/screening_index.png', alt: 'Screening ASQ-3', title: 'Screening ASQ-3' },
    { src: '/images/screening_questionnaire.png', alt: 'Kuesioner Screening', title: 'Kuesioner' },
    { src: '/images/screening_result.png', alt: 'Hasil Screening', title: 'Hasil Screening' },
];

const features = [
    {
        icon: Activity,
        title: 'Real-time Monitoring',
        description: 'Pantau data vitalitas dan aktivitas anak secara langsung dengan sinkronisasi instan.',
        color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    },
    {
        icon: Shield,
        title: 'Data Aman & Privat',
        description: 'Keamanan data anak Anda adalah prioritas. Dilindungi dengan enkripsi end-to-end.',
        color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    },
    {
        icon: Bell,
        title: 'Notifikasi Pintar',
        description: 'Jangan lewatkan jadwal imunisasi atau pemeriksaan dengan pengingat otomatis.',
        color: 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white',
    },
];

export default function DownloadPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <LandingLayout>
            <Head title="Download Aplikasi - JagoanBunda" />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20" />
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl" />

                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
                            {/* Text Content */}
                            <div className="flex-1 text-center lg:text-left space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                                    Pantau Tumbuh Kembang Anak dalam{' '}
                                    <span className="text-emerald-500">Satu Genggaman</span>
                                </h1>
                                <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                                    Aplikasi JagoanBunda memberikan kemudahan bagi orang tua untuk memantau
                                    kesehatan, imunisasi, dan nutrisi anak. Unduh sekarang, gratis!
                                </p>

                                {/* Download Buttons */}
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <Button
                                        size="lg"
                                        className="h-14 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                                    >
                                        <Smartphone className="h-6 w-6 mr-3" />
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-[10px] uppercase opacity-80">Get it on</span>
                                            <span className="text-base font-bold">Google Play</span>
                                        </div>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-14 px-6 border-2 border-gray-900 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                                    >
                                        <Download className="h-6 w-6 mr-3" />
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-[10px] uppercase opacity-80">Download</span>
                                            <span className="text-base font-bold">APK File</span>
                                        </div>
                                    </Button>
                                </div>

                                {/* Version Info */}
                                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-500 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        V 2.4.0 Terbaru
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        4.8/5 Rating
                                    </span>
                                </div>
                            </div>

                            {/* Phone Mockup with Screenshot Slider */}
                            <div className="flex-1 w-full flex justify-center lg:justify-end relative">
                                <div className="relative">
                                    {/* Phone outer frame */}
                                    <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                        {/* Phone notch */}
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

                                        {/* Screenshot */}
                                        <div className="relative rounded-[2.5rem] overflow-hidden bg-white w-[280px] md:w-[320px]">
                                            <img
                                                src={screenshots[currentSlide].src}
                                                alt={screenshots[currentSlide].alt}
                                                className="w-full h-auto transition-opacity duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    </button>

                                    {/* Screenshot Title */}
                                    <p className="text-center mt-4 text-sm font-medium text-gray-600">
                                        {screenshots[currentSlide].title}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex justify-center gap-2 mt-8">
                            {screenshots.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                        ? 'bg-emerald-500 w-6'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* QR Code Section */}
            <section className="py-12 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-blue-100 shadow-lg">
                            <CardContent className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto md:mx-0">
                                            <QrCode className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Lebih Cepat dengan QR Code
                                        </h3>
                                        <p className="text-gray-600">
                                            Sedang membuka halaman ini di laptop? Cukup buka kamera ponsel Anda,
                                            arahkan ke kode QR ini, dan langsung unduh aplikasinya.
                                        </p>
                                        <Link
                                            href="#"
                                            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
                                        >
                                            Panduan Instalasi Lengkap
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <QrCode className="h-24 w-24 text-gray-400" />
                                        </div>
                                        <p className="text-center text-xs font-medium text-gray-500 mt-2">
                                            Scan me
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Fitur Utama Mobile
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Dapatkan pengalaman terbaik memantau tumbuh kembang anak dengan
                                fitur unggulan yang didesain khusus untuk mobile.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="group hover:shadow-lg transition-all hover:-translate-y-1 border-gray-200"
                                >
                                    <CardContent className="p-6 space-y-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${feature.color}`}>
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshot Gallery */}
            <section className="py-16 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Lihat Semua Fitur
                        </h2>
                        <p className="text-gray-600">
                            Jelajahi tampilan aplikasi JagoanBunda
                        </p>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                        {screenshots.map((screenshot, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 snap-center cursor-pointer"
                                onClick={() => goToSlide(index)}
                            >
                                <div className={`w-48 rounded-2xl overflow-hidden border-4 transition-all ${index === currentSlide
                                    ? 'border-emerald-500 shadow-lg'
                                    : 'border-white shadow-md hover:shadow-lg'
                                    }`}>
                                    <img
                                        src={screenshot.src}
                                        alt={screenshot.alt}
                                        className="w-full h-auto"
                                    />
                                </div>
                                <p className="text-center text-sm font-medium text-gray-600 mt-2">
                                    {screenshot.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container px-4 mx-auto">
                    <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-emerald-500 border-0">
                        <CardContent className="p-12 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10 space-y-6">
                                <h2 className="text-3xl font-bold">
                                    Siap Memantau Tumbuh Kembang Si Kecil?
                                </h2>
                                <p className="text-white/90 max-w-xl mx-auto">
                                    Download aplikasi JagoanBunda sekarang dan bergabung dengan ribuan
                                    keluarga Indonesia yang telah mempercayakan kami.
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 rounded-xl"
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    Download Sekarang
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </LandingLayout>
    );
}
