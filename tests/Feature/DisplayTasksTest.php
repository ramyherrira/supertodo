<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DisplayTasksTest extends TestCase
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
    public function testDisplayEmptyTasks()
    {
        $this->actingAs($user = User::factory()->make());
        $response = $this->get('/tasks');

        $response->assertJson(['tasks' => []]);
    }

    public function testDisplayTaskListBasedOnUserId()
    {
        $this->actingAs($user = User::factory()->make());
        Task::factory()
            ->count(5)
            ->create([
                'user_id' => $user->getIdAttribute(),
            ]);
        Task::factory()->create([
            'user_id' => 1,
        ]);

        $response = $this->get('/tasks');

        $response->assertJsonCount(5, 'tasks');
    }
}
