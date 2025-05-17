import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, ArrowLeft, CalendarIcon, Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CreateTaskProps {
    breadcrumbs: BreadcrumbItem[];
}

export default function CreateTask({ breadcrumbs }: CreateTaskProps) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { data, setData, reset, errors } = useForm({
        title: '',
        description: '',
        due_date: '',
    });
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                reset();
                window.location.href = route('tasks.index');
            } else {
                const errorData = await response.json();
                if (errorData.message) {
                    setError(errorData.message);
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error creating task:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Task" />
            
            <div className="px-4 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('tasks.index')}>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Create New Task</h1>
                </div>
                
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Task Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Task title"
                                />
                                {errors.title && <InputError message={errors.title} />}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Task description"
                                    rows={4}
                                />
                                {errors.description && <InputError message={errors.description} />}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="due_date" className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    Due Date
                                </Label>
                                <Input
                                    id="due_date"
                                    type="datetime-local"
                                    value={data.due_date}
                                    onChange={e => setData('due_date', e.target.value)}
                                />
                                {errors.due_date && <InputError message={errors.due_date} />}
                            </div>
                            
                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.location.href = route('tasks.index')}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Save Task
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}