<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;

class TaskViewController extends Controller
{
    public function index()
    {
        $tasks = Task::orderBy('due_date')->get();
        
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('dashboard')],
                ['title' => 'Tasks', 'href' => route('tasks.index')],
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Tasks/Create', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('dashboard')],
                ['title' => 'Tasks', 'href' => route('tasks.index')],
                ['title' => 'Create Task', 'href' => route('tasks.create')],
            ],
        ]);
    }
}