<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profils>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => Fake()->name(),
            'description' => Fake()->name(),
            'prix' => Fake()->Str::random(30),
            'quantite_stock' => Fake()->numberBetween(1, 10)
        ];
    }
}
