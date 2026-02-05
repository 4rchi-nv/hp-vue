<template>
    <div class="moviesContainer">
        <h1>Harry Potter Movies</h1>

        <div v-if="loading" class="loader" aria-label="Loading movies">
            <div v-for="n in 9" :key="n"></div>
        </div>

        <template v-else>
            <div v-for="movie in movies" :key="movie.id" class="movie-card">
                <img :src="movie.attributes.poster" loading="lazy" :alt="movie.attributes.title" />

                <div class="movie-details">
                    <h2>{{ movie.attributes.title }}</h2>
                    <p class="summary">{{ movie.attributes.summary }}</p>

                    <p>
                        Box office:
                        <span>{{ movie.attributes.box_office ?? "—" }}</span>
                    </p>

                    <p>
                        Budget:
                        <span>{{ movie.attributes.budget ?? "—" }}</span>
                    </p>

                    <p>
                        Running time:
                        <span>{{ movie.attributes.running_time ?? "—" }}</span>
                    </p>

                    <a :href="String(movie.attributes.running_time ?? '')" target="_blank" rel="noreferrer">
                        Look for the teaser-trailer
                    </a>
                </div>
            </div>

            <p v-if="error" class="error">{{ error }}</p>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { PotterDbResponse, PotterMovie } from "../../types/potterdb";

import "./movies.css";

const movies = ref<PotterMovie[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchMovies() {
    loading.value = true;
    error.value = null;

    try {
        const res = await fetch("https://api.potterdb.com/v1/movies");

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        const dataset = (await res.json()) as PotterDbResponse<PotterMovie>;
        movies.value = dataset.data ?? [];
    } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        error.value = msg;
        // keep console for dev
        console.error(msg);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchMovies();
});
</script>
