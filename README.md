# Laravel Task Management System

A simple task management application built with Laravel, Inertia.js, React, and TypeScript. This application allows users to create, view, and mark tasks as completed through a beautiful user interface.

## Requirements

- PHP 8.1 or higher
- Composer
- Node.js 16 or higher
- NPM or Yarn
- MySQL, PostgreSQL, or SQLite

## Installation

1. Clone the repository:

```bash
git clone https://github.com/luis0antonio55/to-do-list.git
cd to-do-list
```

2. Install PHP dependencies:

```bash
composer install
```

3. Install JavaScript dependencies:

```bash
npm install
```

4. Copy the environment file:

```bash
cp .env.example .env
```

5. Generate application key:

```bash
php artisan key:generate
```

## Configuration

1. Configure your database in the `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

You can also use SQLite by setting:

```
DB_CONNECTION=sqlite
```

And creating an empty file:

```bash
touch database/database.sqlite
```

## Database Setup

1. Run migrations to create necessary tables:

```bash
php artisan migrate
```

2. Seed the database with sample data:

```bash
php artisan db:seed
```

Or specifically seed the tasks:

```bash
php artisan db:seed --class=TaskSeeder
```

## Running the Application

1. Start the Laravel development server:

```bash
php artisan serve
```

2. In another terminal, compile and watch the frontend assets:

```bash
npm run dev
```

3. Access the application in your browser:

```
http://localhost:8000
```

4. Login with the test user:
   - Email: `user@example.com`
   - Password: `password`

If the default user doesn't work, create a new user:

```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => bcrypt('password')
]);
```

5. Navigate to the tasks page:

```
http://localhost:8000/tasks
```

## API Endpoints

The application provides the following RESTful API endpoints:

1. **List all tasks**
   - URL: `/api/tasks`
   - Method: GET
   - Response: JSON array of task objects

2. **Create a new task**
   - URL: `/api/tasks`
   - Method: POST
   - Headers: 
     - `Content-Type: application/json`
     - `X-CSRF-TOKEN: [token]`
   - Body:
     ```json
     {
       "title": "Task title",
       "description": "Task description",
       "due_date": "YYYY-MM-DD HH:MM:SS"
     }
     ```
   - Response: JSON object of the created task

3. **Mark a task as completed**
   - URL: `/api/tasks/{id}`
   - Method: PUT
   - Headers:
     - `Content-Type: application/json`
     - `X-CSRF-TOKEN: [token]`
   - Response: JSON object of the updated task






