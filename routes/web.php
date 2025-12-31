<?php

use App\Http\Controllers\FoodController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public Landing Pages
Route::get('/', fn() => Inertia::render('landing/index'))->name('home');
Route::get('/about', fn() => Inertia::render('landing/about'))->name('about');
Route::get('/contact', fn() => Inertia::render('landing/contact'))->name('contact');
Route::get('/download', fn() => Inertia::render('landing/download'))->name('download');

// Auth Routes (placeholder - will be implemented by backend team)
Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');

// Dashboard Routes (using mock data for now)
Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', fn() => Inertia::render('dashboard/index'))->name('index');
});

Route::get('/parents', fn() => Inertia::render('parents/index'))->name('parents.index');
Route::get('/children', fn() => Inertia::render('children/index'))->name('children.index');
Route::get('/children/{id}', fn() => Inertia::render('children/show'))->name('children.show');

// Food Data Master CRUD
Route::resource('foods', FoodController::class);

// PMT Programs & ASQ-3 Screenings
Route::get('/pmt', fn() => Inertia::render('pmt/index'))->name('pmt.index');
Route::get('/screenings', fn() => Inertia::render('screenings/index'))->name('screenings.index');
Route::get('/screenings/{id}/results', fn() => Inertia::render('screenings/results'))->name('screenings.results');

// Placeholder routes for other pages
Route::get('/reports', fn() => Inertia::render('dashboard/index'))->name('reports.index');
Route::get('/settings', fn() => Inertia::render('dashboard/index'))->name('settings.index');

// Logout placeholder
Route::post('/logout', function () {
    return redirect('/');
})->name('logout');
