<script setup lang="ts">
import { computed } from 'vue'
import yaml from 'js-yaml'
import rawEvents from '../../../../data/events.yml?raw'

type Event = {
  date: string
  title: string
  desc?: string
  url?: string
  tags?: string[]
}

const props = defineProps<{ tag?: string }>()

let events: Event[] = []
try {
  // JSON_SCHEMA：日期保持字符串，避免被解析成 Date 对象
  const parsed = yaml.load(rawEvents, { schema: yaml.JSON_SCHEMA })
  events = Array.isArray(parsed) ? (parsed as Event[]) : []
} catch (e) {
  console.error('[Timeline] 解析 data/events.yml 失败:', e)
}

const filtered = computed(() =>
  events
    .filter((ev) => !props.tag || (ev.tags ?? []).includes(props.tag))
    .sort((a, b) => b.date.localeCompare(a.date)),
)

const byYear = computed(() => {
  const m = new Map<string, Event[]>()
  for (const ev of filtered.value) {
    const y = ev.date.slice(0, 4)
    if (!m.has(y)) m.set(y, [])
    m.get(y)!.push(ev)
  }
  return [...m.entries()].sort((a, b) => b[0].localeCompare(a[0]))
})
</script>

<template>
  <div v-if="byYear.length" class="tl">
    <section v-for="[year, evs] in byYear" :key="year" class="tl-year">
      <h3 :id="`tl-${year}`">{{ year }}</h3>
      <ul>
        <li v-for="ev in evs" :key="ev.date + ev.title">
          <span class="tl-date">{{ ev.date }}</span>
          <a v-if="ev.url" :href="ev.url" target="_blank" rel="noopener">{{ ev.title }}</a>
          <strong v-else>{{ ev.title }}</strong>
          <span v-if="ev.desc" class="tl-desc">—— {{ ev.desc }}</span>
        </li>
      </ul>
    </section>
  </div>
  <p v-else>暂无时间线事件。</p>
</template>

<style scoped>
.tl-year h3 {
  margin: 1.6rem 0 0.6rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.tl ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.tl li {
  position: relative;
  padding: 0.35rem 0 0.35rem 1.1rem;
  line-height: 1.7;
}
.tl li::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: 0.95rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-brand);
}
.tl-date {
  display: inline-block;
  min-width: 6.2rem;
  color: var(--vp-c-text-3);
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
}
.tl-desc {
  color: var(--vp-c-text-2);
}
</style>
