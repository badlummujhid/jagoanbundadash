import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layouts/landing-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { useState } from 'react';

const contactInfo = [
    {
        icon: Mail,
        title: 'Email',
        value: 'info@jagoanbunda.id',
        description: 'Kirim email kapan saja',
    },
    {
        icon: Phone,
        title: 'Telepon',
        value: '+62 21 1234 5678',
        description: 'Senin - Jumat, 08:00 - 17:00 WIB',
    },
    {
        icon: MapPin,
        title: 'Alamat',
        value: 'Jakarta, Indonesia',
        description: 'Jl. Kesehatan No. 123',
    },
];

const faqs = [
    {
        question: 'Apakah aplikasi JagoanBunda gratis?',
        answer: 'Ya, aplikasi JagoanBunda dapat diunduh dan digunakan secara gratis oleh semua orang tua di Indonesia.',
    },
    {
        question: 'Bagaimana cara menghubungkan dengan tenaga kesehatan?',
        answer: 'Setelah registrasi, Anda dapat memilih puskesmas terdekat dan data anak Anda akan terhubung dengan tenaga kesehatan setempat.',
    },
    {
        question: 'Apakah data anak saya aman?',
        answer: 'Keamanan data adalah prioritas kami. Semua data dienkripsi dan disimpan sesuai standar keamanan kesehatan.',
    },
    {
        question: 'Bagaimana jika hasil screening menunjukkan perlu rujukan?',
        answer: 'Aplikasi akan memberikan rekomendasi dan menghubungkan Anda dengan tenaga kesehatan terdekat untuk tindak lanjut.',
    },
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert('Pesan Anda telah terkirim!');
    };

    return (
        <LandingLayout>
            <Head title="Hubungi Kami - JagoanBunda" />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ada pertanyaan atau masukan? Kami siap membantu Anda.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Kirim Pesan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nama</label>
                                        <Input
                                            placeholder="Nama lengkap Anda"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Subjek</label>
                                        <select
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                        >
                                            <option value="">Pilih subjek</option>
                                            <option value="general">Pertanyaan Umum</option>
                                            <option value="technical">Bantuan Teknis</option>
                                            <option value="partnership">Kerjasama</option>
                                            <option value="feedback">Masukan & Saran</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Pesan</label>
                                        <textarea
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="Tulis pesan Anda..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full gap-2">
                                        <Send className="h-4 w-4" />
                                        Kirim Pesan
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <Card key={index}>
                                    <CardContent className="flex items-start gap-4 p-6">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <info.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{info.title}</h3>
                                            <p className="text-primary font-medium">{info.value}</p>
                                            <p className="text-sm text-muted-foreground">{info.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Map placeholder */}
                            <Card>
                                <CardContent className="p-0">
                                    <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                                        <div className="text-center text-muted-foreground">
                                            <MapPin className="h-8 w-8 mx-auto mb-2" />
                                            <p className="text-sm">Peta lokasi kantor</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/30">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan Umum</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <Card key={index}>
                                <button
                                    className="w-full text-left p-6 flex items-center justify-between"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <CardContent className="pt-0 pb-6 px-6">
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
