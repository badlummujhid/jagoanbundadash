<?php

namespace Database\Seeders;

use App\Models\Asq3AgeInterval;
use Illuminate\Database\Seeder;

class Asq3AgeIntervalSeeder extends Seeder
{
   /**
    * Run the database seeds.
    *
    * ASQ-3 Age Intervals (21 intervals from 2 to 60 months)
    */
   public function run(): void
   {
      $intervals = [
         ['age_months' => 2,  'min_age_months' => 0,  'max_age_months' => 2,  'age_label' => '2 Bulan',  'min_age_days' => 46,  'max_age_days' => 76],
         ['age_months' => 4,  'min_age_months' => 3,  'max_age_months' => 4,  'age_label' => '4 Bulan',  'min_age_days' => 107, 'max_age_days' => 137],
         ['age_months' => 6,  'min_age_months' => 5,  'max_age_months' => 6,  'age_label' => '6 Bulan',  'min_age_days' => 168, 'max_age_days' => 198],
         ['age_months' => 8,  'min_age_months' => 7,  'max_age_months' => 8,  'age_label' => '8 Bulan',  'min_age_days' => 229, 'max_age_days' => 259],
         ['age_months' => 9,  'min_age_months' => 8,  'max_age_months' => 9,  'age_label' => '9 Bulan',  'min_age_days' => 260, 'max_age_days' => 289],
         ['age_months' => 10, 'min_age_months' => 9,  'max_age_months' => 11, 'age_label' => '10 Bulan', 'min_age_days' => 290, 'max_age_days' => 319],
         ['age_months' => 12, 'min_age_months' => 11, 'max_age_months' => 13, 'age_label' => '12 Bulan', 'min_age_days' => 350, 'max_age_days' => 380],
         ['age_months' => 14, 'min_age_months' => 13, 'max_age_months' => 15, 'age_label' => '14 Bulan', 'min_age_days' => 411, 'max_age_days' => 441],
         ['age_months' => 16, 'min_age_months' => 15, 'max_age_months' => 17, 'age_label' => '16 Bulan', 'min_age_days' => 472, 'max_age_days' => 502],
         ['age_months' => 18, 'min_age_months' => 17, 'max_age_months' => 19, 'age_label' => '18 Bulan', 'min_age_days' => 533, 'max_age_days' => 563],
         ['age_months' => 20, 'min_age_months' => 19, 'max_age_months' => 21, 'age_label' => '20 Bulan', 'min_age_days' => 594, 'max_age_days' => 624],
         ['age_months' => 22, 'min_age_months' => 21, 'max_age_months' => 23, 'age_label' => '22 Bulan', 'min_age_days' => 655, 'max_age_days' => 685],
         ['age_months' => 24, 'min_age_months' => 23, 'max_age_months' => 26, 'age_label' => '24 Bulan', 'min_age_days' => 716, 'max_age_days' => 746],
         ['age_months' => 27, 'min_age_months' => 26, 'max_age_months' => 29, 'age_label' => '27 Bulan', 'min_age_days' => 807, 'max_age_days' => 837],
         ['age_months' => 30, 'min_age_months' => 29, 'max_age_months' => 32, 'age_label' => '30 Bulan', 'min_age_days' => 898, 'max_age_days' => 928],
         ['age_months' => 33, 'min_age_months' => 32, 'max_age_months' => 35, 'age_label' => '33 Bulan', 'min_age_days' => 989, 'max_age_days' => 1019],
         ['age_months' => 36, 'min_age_months' => 35, 'max_age_months' => 40, 'age_label' => '36 Bulan', 'min_age_days' => 1080, 'max_age_days' => 1110],
         ['age_months' => 42, 'min_age_months' => 40, 'max_age_months' => 46, 'age_label' => '42 Bulan', 'min_age_days' => 1262, 'max_age_days' => 1292],
         ['age_months' => 48, 'min_age_months' => 46, 'max_age_months' => 52, 'age_label' => '48 Bulan', 'min_age_days' => 1444, 'max_age_days' => 1474],
         ['age_months' => 54, 'min_age_months' => 52, 'max_age_months' => 58, 'age_label' => '54 Bulan', 'min_age_days' => 1626, 'max_age_days' => 1656],
         ['age_months' => 60, 'min_age_months' => 58, 'max_age_months' => 66, 'age_label' => '60 Bulan', 'min_age_days' => 1808, 'max_age_days' => 1838],
      ];

      foreach ($intervals as $interval) {
         Asq3AgeInterval::updateOrCreate(
            ['age_months' => $interval['age_months']],
            $interval
         );
      }
   }
}
