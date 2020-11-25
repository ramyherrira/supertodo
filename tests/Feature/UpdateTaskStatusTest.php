<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UpdateTaskStatusTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Task::truncate();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUpdate()
    {
        $task = new Task();
        $task->title = 'refined_task';
        $task->completed = false;
        $task->save();

        $response = $this->put('/tasks/' . $task->id);

        $updated = Task::where('title', '=', 'refined_task')->first();

        $response->assertStatus(200);
        $this->assertEquals(true, $updated->completed);
    }
}
