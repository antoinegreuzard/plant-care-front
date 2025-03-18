<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <Navbar/>

    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto p-4">
      <router-view/>
    </main>

    <!-- Footer -->
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>
