import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CheckCircle, PlusCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type Task, type BreadcrumbItem } from '@/types';

interface TasksIndexProps {
    tasks: Task[];
    breadcrumbs: BreadcrumbItem[];
}

export default function TasksIndex({ tasks, breadcrumbs }: TasksIndexProps) {
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    
    const handleMarkAsCompleted = async (taskId: number) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            
            if (response.ok) {
                const updatedTask = await response.json();
                setTaskList(currentTasks => 
                    currentTasks.map(task => 
                        task.id === taskId ? updatedTask : task
                    )
                );
            }
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            
            <div className="px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Tasks Management</h1>
                    <Link href={route('tasks.create')} className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                        <PlusCircle className="h-4 w-4" />
                        Create Task
                    </Link>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {taskList.length === 0 ? (
                        <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                            <p className="text-muted-foreground">No tasks found. Create your first task!</p>
                        </div>
                    ) : (
                        taskList.map(task => (
                            <Card key={task.id} className={task.is_completed ? "opacity-75" : ""}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className={`text-lg ${task.is_completed ? "line-through" : ""}`}>
                                            {task.title}
                                        </CardTitle>
                                        <Badge variant={task.is_completed ? "secondary" : "default"}>
                                            {task.is_completed ? "Completed" : "Pending"}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className={`text-sm ${task.is_completed ? "text-muted-foreground" : ""}`}>
                                        {task.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <CalendarIcon className="h-3 w-3" />
                                            <span>{formatDate(task.due_date)}</span>
                                        </div>
                                        
                                        {!task.is_completed && (
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => handleMarkAsCompleted(task.id)}
                                                className="inline-flex items-center gap-1"
                                            >
                                                <CheckCircle className="h-3 w-3" />
                                                Complete
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}