// User/Auth types
export interface User {
    id: number;
    email: string;
    full_name: string;
    phone?: string;
    avatar_url?: string;
    push_notifications?: boolean;
    weekly_report?: boolean;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

// Child types
export type Gender = 'male' | 'female';

export interface Child {
    id: number;
    user_id: number;
    name: string;
    date_of_birth: string;
    gender: Gender;
    avatar_url?: string;
    birth_weight?: number;
    birth_height?: number;
    birth_head_circumference?: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    // Computed/joined fields
    parent?: User;
    age_months?: number;
    latest_measurement?: AnthropometryMeasurement;
}

// Anthropometry types
export type MeasurementLocation = 'posyandu' | 'home' | 'clinic' | 'hospital' | 'other';
export type NutritionalStatus = 'severely_underweight' | 'underweight' | 'normal' | 'overweight' | 'obese';
export type StuntingStatus = 'severely_stunted' | 'stunted' | 'normal' | 'tall';
export type WastingStatus = 'severely_wasted' | 'wasted' | 'normal' | 'overweight' | 'obese';

export interface AnthropometryMeasurement {
    id: number;
    child_id: number;
    measurement_date: string;
    weight?: number;
    height?: number;
    head_circumference?: number;
    is_lying?: boolean;
    measurement_location?: MeasurementLocation;
    weight_for_age_zscore?: number;
    height_for_age_zscore?: number;
    weight_for_height_zscore?: number;
    bmi_for_age_zscore?: number;
    head_circumference_zscore?: number;
    nutritional_status?: NutritionalStatus;
    stunting_status?: StuntingStatus;
    wasting_status?: WastingStatus;
    notes?: string;
    created_at: string;
}

// ASQ-3 Screening types
export type ScreeningStatus = 'in_progress' | 'completed' | 'cancelled';
export type ScreeningResult = 'sesuai' | 'pantau' | 'perlu_rujukan';
export type AnswerType = 'yes' | 'sometimes' | 'no';
export type ASQ3DomainCode = 'communication' | 'gross_motor' | 'fine_motor' | 'problem_solving' | 'personal_social';

export interface ASQ3Domain {
    id: number;
    code: ASQ3DomainCode;
    name: string;
    icon?: string;
    color?: string;
    display_order?: number;
}

export interface ASQ3Screening {
    id: number;
    child_id: number;
    age_interval_id: number;
    screening_date: string;
    age_at_screening_months: number;
    age_at_screening_days?: number;
    status: ScreeningStatus;
    completed_at?: string;
    overall_status?: ScreeningResult;
    notes?: string;
    child?: Child;
    results?: ASQ3ScreeningResult[];
    created_at: string;
}

export interface ASQ3ScreeningResult {
    id: number;
    screening_id: number;
    domain_id: number;
    total_score: number;
    cutoff_score: number;
    monitoring_score: number;
    status: ScreeningResult;
    domain?: ASQ3Domain;
}

export interface ASQ3Recommendation {
    id: number;
    domain_id: number;
    age_interval_id?: number;
    recommendation_text: string;
    priority: number;
}

// PMT types
export type PmtPortion = 'habis' | 'half' | 'quarter' | 'none';

export interface PMTMenu {
    id: number;
    name: string;
    description?: string;
    image_url?: string;
    calories?: number;
    protein?: number;
    min_age_months?: number;
    max_age_months?: number;
    is_active: boolean;
}

export interface PMTSchedule {
    id: number;
    child_id: number;
    menu_id: number;
    scheduled_date: string;
    child?: Child;
    menu?: PMTMenu;
    log?: PMTLog;
}

export interface PMTLog {
    id: number;
    schedule_id: number;
    portion: PmtPortion;
    photo_url?: string;
    notes?: string;
    logged_at: string;
}

// Food types
export type MealTime = 'pagi' | 'siang' | 'malam' | 'snack';

export interface Food {
    id: number;
    name: string;
    category?: string;
    icon?: string;
    serving_size: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    fiber?: number;
    sugar?: number;
    is_active?: boolean;
    is_system?: boolean;
}

export interface FoodLog {
    id: number;
    child_id: number;
    log_date: string;
    meal_time: MealTime;
    total_calories: number;
    total_protein: number;
    total_fat: number;
    total_carbohydrate: number;
    notes?: string;
    items?: FoodLogItem[];
}

export interface FoodLogItem {
    id: number;
    food_log_id: number;
    food_id: number;
    quantity: number;
    serving_size: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    food?: Food;
}

// Notification types
export interface Notification {
    id: number;
    user_id: number;
    type: string;
    title: string;
    body: string;
    data?: Record<string, unknown>;
    read_at?: string;
    created_at: string;
}

// Pagination types
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

// Dashboard stats types
export interface DashboardStats {
    total_parents: number;
    total_children: number;
    at_risk_children: number;
    active_pmt_programs: number;
    nutritional_distribution: {
        normal: number;
        underweight: number;
        stunted: number;
        wasted: number;
    };
    recent_screenings: ASQ3Screening[];
    children_requiring_attention: Child[];
}

// =====================================================
// ENUM LABELS (Indonesian)
// =====================================================

export const MealTimeLabels: Record<MealTime, string> = {
    pagi: 'Sarapan',
    siang: 'Makan Siang',
    malam: 'Makan Malam',
    snack: 'Snack',
};

export const MeasurementLocationLabels: Record<MeasurementLocation, string> = {
    posyandu: 'Posyandu',
    home: 'Rumah',
    clinic: 'Klinik/Puskesmas',
    hospital: 'Rumah Sakit',
    other: 'Lainnya',
};

export const NutritionalStatusLabels: Record<NutritionalStatus, string> = {
    severely_underweight: 'Gizi Buruk',
    underweight: 'Gizi Kurang',
    normal: 'Gizi Baik',
    overweight: 'Risiko Gizi Lebih',
    obese: 'Gizi Lebih',
};

export const StuntingStatusLabels: Record<StuntingStatus, string> = {
    severely_stunted: 'Sangat Pendek',
    stunted: 'Pendek',
    normal: 'Normal',
    tall: 'Tinggi',
};

export const WastingStatusLabels: Record<WastingStatus, string> = {
    severely_wasted: 'Gizi Buruk',
    wasted: 'Gizi Kurang',
    normal: 'Gizi Baik',
    overweight: 'Berisiko Gizi Lebih',
    obese: 'Gizi Lebih',
};

export const ScreeningResultLabels: Record<ScreeningResult, string> = {
    sesuai: 'Sesuai Tahapan',
    pantau: 'Perlu Pemantauan',
    perlu_rujukan: 'Perlu Rujukan',
};

export const ASQ3DomainLabels: Record<ASQ3DomainCode, string> = {
    communication: 'Komunikasi',
    gross_motor: 'Motorik Kasar',
    fine_motor: 'Motorik Halus',
    problem_solving: 'Pemecahan Masalah',
    personal_social: 'Personal Sosial',
};

export const PmtPortionLabels: Record<PmtPortion, string> = {
    habis: 'Habis (100%)',
    half: 'Setengah (50%)',
    quarter: 'Seperempat (25%)',
    none: 'Tidak Dimakan (0%)',
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export function calculateAge(dateOfBirth: string): { years: number; months: number; days: number } {
    const birth = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

export function getAgeInMonths(dateOfBirth: string): number {
    const age = calculateAge(dateOfBirth);
    return age.years * 12 + age.months;
}

export function formatAgeLabel(dateOfBirth: string): string {
    const age = calculateAge(dateOfBirth);
    if (age.years > 0) {
        return `${age.years} tahun ${age.months} bulan`;
    }
    return `${age.months} bulan`;
}

export function getNutritionalStatusColor(status: NutritionalStatus): string {
    switch (status) {
        case 'severely_underweight':
            return 'bg-red-100 text-red-700 border-red-200';
        case 'underweight':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'normal':
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'overweight':
            return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'obese':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
}

export function getStuntingStatusColor(status: StuntingStatus): string {
    switch (status) {
        case 'severely_stunted':
            return 'bg-red-100 text-red-700 border-red-200';
        case 'stunted':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'normal':
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'tall':
            return 'bg-blue-100 text-blue-700 border-blue-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
}

export function getScreeningResultColor(status: ScreeningResult): string {
    switch (status) {
        case 'sesuai':
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'pantau':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'perlu_rujukan':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
}

export function getPortionPercentage(portion: PmtPortion): number {
    switch (portion) {
        case 'habis':
            return 100;
        case 'half':
            return 50;
        case 'quarter':
            return 25;
        case 'none':
            return 0;
        default:
            return 0;
    }
}

export function getPortionColor(portion: PmtPortion): string {
    switch (portion) {
        case 'habis':
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'half':
            return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'quarter':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'none':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
}

