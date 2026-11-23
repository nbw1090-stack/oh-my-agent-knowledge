<script setup lang="ts">
import { computed, ref } from 'vue'
import yaml from 'js-yaml'
import rawFrameworks from '../../../../data/frameworks.yml?raw'
import rawProducts from '../../../../data/products.yml?raw'
import rawExtensions from '../../../../data/extensions.yml?raw'
import rawSources from '../../../../data/sources.yml?raw'
import rawPapers from '../../../../data/papers.yml?raw'

const rawMap: Record<string, string> = {
  frameworks: rawFrameworks,
  products: rawProducts,
  extensions: rawExtensions,
  sources: rawSources,
  papers: rawPapers,
}

const props = defineProps<{
  source: string
  kind?: string
}>()

type Item = {
  name: string
  url?: string
  comment?: string
  tags?: string[]
  stars?: number
  kind?: string
  category?: string
  company?: string
  region?: string
  lang?: string[]
  platform?: string[]
  status?: string
  added?: string
  [key: string]: unknown
}

let items: Item[] = []
try {
  // JSON_SCHEMA：日期保持字符串，避免被解析成 Date 对象
  const parsed = yaml.load(rawMap[props.source] ?? '[]', { schema: yaml.JSON_SCHEMA })
  items = Array.isArray(parsed) ? (parsed as Item[]) : []
} catch (e) {
  console.error(`[ResourceGrid] 解析 data/${props.source}.yml 失败:`, e)
}
if (props.kind) items = items.filter((i) => i.kind === props.kind)

const q = ref('')
const activeTags = ref(new Set<string>())
const hasStars = items.some((i) => typeof i.stars === 'number' && i.stars > 0)

const allTags = computed(() => {
  const freq = new Map<string, number>()
  for (const it of items)
    for (const t of it.tags ?? []) freq.set(t, (freq.get(t) ?? 0) + 1)
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t)
})

function toggleTag(t: string) {
  const next = new Set(activeTags.value)
  next.has(t) ? next.delete(t) : next.add(t)
  activeTags.value = next
}

const filtered = computed(() => {
  const kw = q.value.trim().toLowerCase()
  return items
    .filter((it) => {
      if (activeTags.value.size) {
        const tags = it.tags ?? []
        for (const t of activeTags.value) if (!tags.includes(t)) return false
      }
      if (!kw) return true
      const hay = [it.name, it.comment, it.category, it.company, ...(it.tags ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return hay.includes(kw)
    })
    .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0) || (b.added ?? '').localeCompare(a.added ?? ''))
})

function fmtStars(n?: number) {
  if (typeof n !== 'number' || n <= 0) return '-'
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

function subline(it: Item) {
  const parts: string[] = []
  if (it.company) parts.push(it.company)
  if (it.region) parts.push(it.region === 'cn' ? '国内' : '海外')
  if (it.lang?.length) parts.push(it.lang.join(' / '))
  if (it.platform?.length) parts.push(it.platform.join(' · '))
  if (it.status && it.status !== 'active') parts.push(`[${it.status}]`)
  return parts.join(' ｜ ')
}
</script>

<template>
  <div class="rg">
    <div class="rg-controls">
      <input v-model="q" class="rg-search" type="search" placeholder="搜索名称 / 点评 / 标签…" />
      <div v-if="allTags.length" class="rg-tags">
        <button
          v-for="t in allTags"
          :key="t"
          class="rg-tag"
          :class="{ active: activeTags.has(t) }"
          @click="toggleTag(t)"
        >
          {{ t }}
        </button>
      </div>
      <span class="rg-count">共 {{ filtered.length }} 条</span>
    </div>

    <div class="rg-table-wrap">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>点评</th>
            <th v-if="allTags.length">标签</th>
            <th v-if="hasStars">Star</th>
            <th>收录</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="it in filtered" :key="it.name">
            <td>
              <a v-if="it.url" :href="it.url" target="_blank" rel="noopener">{{ it.name }}</a>
              <template v-else>{{ it.name }}</template>
              <div v-if="subline(it)" class="rg-sub">{{ subline(it) }}</div>
            </td>
            <td class="rg-comment">{{ it.comment }}</td>
            <td v-if="allTags.length">
              <span v-for="t in it.tags ?? []" :key="t" class="rg-pill">{{ t }}</span>
            </td>
            <td v-if="hasStars">{{ fmtStars(it.stars) }}</td>
            <td class="rg-added">{{ it.added }}</td>
          </tr>
          <tr v-if="!filtered.length">
            <td :colspan="5" class="rg-empty">没有匹配的条目，换个关键词试试</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.rg-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.rg-search {
  flex: 0 1 16rem;
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}
.rg-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  flex: 1 1 auto;
}
.rg-tag {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 999px;
  padding: 0.1rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;
}
.rg-tag.active {
  border-color: var(--vp-brand);
  color: var(--vp-brand);
  background: var(--vp-c-bg-soft-up);
}
.rg-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.rg-table-wrap {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
th,
td {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0.55rem 0.75rem;
  text-align: left;
  vertical-align: top;
}
th {
  color: var(--vp-c-text-2);
  font-weight: 600;
  white-space: nowrap;
}
.rg-sub {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
}
.rg-comment {
  color: var(--vp-c-text-2);
  min-width: 14rem;
}
.rg-pill {
  display: inline-block;
  margin: 0 0.25rem 0.25rem 0;
  padding: 0 0.45rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
.rg-added {
  white-space: nowrap;
  color: var(--vp-c-text-3);
  font-size: 0.78rem;
}
.rg-empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 2rem 0;
}
</style>
