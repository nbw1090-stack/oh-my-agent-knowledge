<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const fm = computed(() => frontmatter.value as Record<string, unknown>)

const reviewed = computed(() => (typeof fm.value['last-reviewed'] === 'string' ? fm.value['last-reviewed'] as string : ''))
const status = computed(() => (typeof fm.value.status === 'string' ? fm.value.status : ''))

const staleDays = computed(() => {
  if (!reviewed.value) return null
  const days = Math.floor((Date.now() - new Date(reviewed.value).getTime()) / 86400000)
  return Number.isFinite(days) ? days : null
})
</script>

<template>
  <div v-if="reviewed || status" class="fb">
    <span v-if="status" class="fb-chip" :data-status="status">{{ status }}</span>
    <span v-if="reviewed" class="fb-chip" :class="{ stale: (staleDays ?? 0) > 180 }">
      <template v-if="(staleDays ?? 0) > 180">⚠️ 最后审校 {{ reviewed }}，已超 180 天，内容可能过时</template>
      <template v-else>最后审校：{{ reviewed }}</template>
    </span>
  </div>
</template>

<style scoped>
.fb {
  margin: 0.5rem 0 1.25rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.fb-chip {
  display: inline-block;
  padding: 0.1rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
.fb-chip[data-status='active'] {
  color: #16a34a;
  border-color: #16a34a55;
}
.fb-chip[data-status='stable'] {
  color: #2563eb;
  border-color: #2563eb55;
}
.fb-chip[data-status='archived'] {
  color: var(--vp-c-text-3);
}
.fb-chip.stale {
  color: #d97706;
  border-color: #d9770655;
}
</style>
