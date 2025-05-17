<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Mostrar lista de todas las tareas.
     */
    public function index()
    {
        $tasks = Task::orderBy('due_date')->get();
        return response()->json($tasks);
    }

    /**
     * Crear una nueva tarea.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'is_completed' => false,
        ]);

        return response()->json($task, Response::HTTP_CREATED);
    }

    /**
     * Marcar una tarea como completada.
     */
    public function markAsCompleted($id)
    {
        $task = Task::findOrFail($id);
        $task->is_completed = true;
        $task->save();

        return response()->json($task);
    }
}