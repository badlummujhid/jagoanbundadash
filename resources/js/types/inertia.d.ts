import type { User } from './models';

export interface PageProps {
    auth: {
        user: User | null;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

declare module '@inertiajs/react' {
    export function usePage<T extends PageProps>(): { props: T };
}
