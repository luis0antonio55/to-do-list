<?php

namespace Database\Seeders;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Complete project documentation',
                'description' => 'Write the documentation of the Laravel .',
                'due_date' => Carbon::now()->addDays(5),
                'is_completed' => false
            ],
            [
                'title' => 'Implement authentication',
                'description' => 'Configure the authentication system for the application',
                'due_date' => Carbon::now()->addDays(2),
                'is_completed' => false
            ],
            [
                'title' => 'Perform unit tests',
                'description' => 'Write tests for controllers and models',
                'due_date' => Carbon::now()->addDays(7),
                'is_completed' => false
            ],
            [
                'title' => 'Optimize database queries',
                'description' => 'Review and optimize SQL queries to improve performance',
                'due_date' => Carbon::now()->addDays(3),
                'is_completed' => true
            ],
            [
                'title' => 'Deploy to production',
                'description' => 'Prepare production environment and perform deployment',
                'due_date' => Carbon::now()->addDays(10),
                'is_completed' => false
            ]
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}