import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface LandingLayoutProps {
    children: React.ReactNode;
}

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Download', href: '/download' },
];

export default function LandingLayout({ children }: LandingLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="container flex h-16 items-center justify-between px-4 mx-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="JagoanBunda" className="h-10 w-10 rounded-lg" />
                        <span className="text-xl font-bold text-foreground">JagoanBunda</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    currentPath === link.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link href="/download">
                            <Button>Download App</Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t bg-card">
                        <nav className="container px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "block text-sm font-medium transition-colors",
                                        currentPath === link.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="my-3" />
                            <div className="flex flex-col gap-2">
                                <Link href="/login">
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link href="/download">
                                    <Button className="w-full">Download App</Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-card border-t">
                <div className="container px-4 py-12 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <img src="/images/logo.png" alt="JagoanBunda" className="h-10 w-10 rounded-lg" />
                                <span className="text-lg font-bold">JagoanBunda</span>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                Aplikasi monitoring tumbuh kembang anak untuk keluarga Indonesia.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                                <li><Link href="/download" className="hover:text-primary">Download</Link></li>
                            </ul>
                        </div>

                        {/* Features */}
                        <div>
                            <h4 className="font-semibold mb-4">Features</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>Tracking Antropometri</li>
                                <li>Monitoring Nutrisi</li>
                                <li>Screening ASQ-3</li>
                                <li>Program PMT</li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>info@jagoanbunda.id</li>
                                <li>+62 21 1234 5678</li>
                                <li>Jakarta, Indonesia</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-8" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} JagoanBunda. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
