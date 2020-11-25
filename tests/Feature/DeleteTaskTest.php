<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteTaskTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $task = new Task();
        $task->title = 'a_soon_to_be_removed';
        $task->completed = true;
        $task->save();

        $response = $this->delete('/tasks/' . $task->id);

        $count = Task::where('title', 'a_soon_to_be_removed')->count();

        $response->assertStatus(200);
        $this->assertTrue(0 === $count, 'The Task should be removed');
    }
}
