<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateNewTaskTest extends TestCase
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
    public function testPostRequest()
    {
        $this->actingAs(User::factory()->make());
        $response = $this->post('/tasks', [
            'title' => 'Task #1',
        ]);

        $task = Task::first();

        $response->assertStatus(200);
        $response->assertSuccessful();
        $this->assertEquals('Task #1', $task->title);
    }
}
