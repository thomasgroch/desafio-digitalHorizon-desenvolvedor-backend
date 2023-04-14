<template>
  <div class="pt-8">
    <p class="text-sm text-neutral-500 text-center">
      © 14/04/2023 -
      <a href="https://thomasgroch.xyz/" target="_blank">Thomas Groch</a> para
      <a href="https://www.digitalhorizon.sv/" target="_blank">DigitalHorizon</a>.
    </p>
    <p class="text-sm text-neutral-500 text-center" v-if="commit_ref">
      <span v-if="node_version">Build with node {{ node_version }}<br /></span>
      <a :href="repository_url + '/commit/' + commit_ref" target="_blank"
        >#{{ commit_ref.substring(0, 7) }}</a
      >
      <span v-if="branch">
        on <a :href="repository_url + '/tree/' + branch" target="_blank">{{ branch }}</a
        >.
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currentPath = computed(() => route.path)

const site_name = ref(import.meta.env.SITE_NAME)
const url = ref(import.meta.env.URL)
const node_version = ref(import.meta.env.NODE_VERSION)
const repository_url = ref(import.meta.env.REPOSITORY_URL) // URL for the linked Git repository.
const commit_ref = ref(import.meta.env.COMMIT_REF) // Reference of the commit we’re building.
const branch = ref(import.meta.env.BRANCH) // Reference to check out after fetching changes from the Git repository. useful in split testing https://www.netlify.com/docs/split-testing/#exposing-split-test-information-in-your-site
const netlify_images_cdn_domain = ref(import.meta.env.NETLIFY_IMAGES_CDN_DOMAIN)
const context = ref(import.meta.env.CONTEXT) // Name of the context a deploy is built around, it can be `production`, `deploy-preview` or `branch-deploy`.
</script>
