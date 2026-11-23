// RSS 聚合：拉取 data/sources.yml 中 has-rss: true 的源，
// 生成周报草稿 docs/digest/inbox/YYYY-WW.md（只列标题+链接，人工筛选成稿）
// 用法：node scripts/fetch-feeds.mjs [--days 14]
import { loadYaml } from './lib.mjs'
import Parser from 'rss-parser'
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const days = Number(args[args.indexOf('--days') + 1] ?? 14) || 14
const parser = new Parser({ timeout: 20000 })
const since = Date.now() - days * 86400000

const sources = (loadYaml('sources.yml') ?? []).filter((s) => s['has-rss'])

function isoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7)
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`
}

const bySource = []
for (const s of sources) {
  const feedUrl = s.rss ?? s.url
  try {
    const feed = await parser.parseURL(feedUrl)
    const posts = (feed.items ?? [])
      .filter((it) => {
        const t = it.isoDate ? new Date(it.isoDate).getTime() : it.pubDate ? new Date(it.pubDate).getTime() : Date.now()
        return t >= since
      })
      .slice(0, 10)
      .map((it) => ({ title: it.title?.trim(), link: it.link }))
    bySource.push({ name: s.name, url: s.url, posts })
    console.log(`  ✓ ${s.name}: 近 ${days} 天 ${posts.length} 篇`)
  } catch (e) {
    console.warn(`  ⚠ ${s.name}: ${e.message}`)
    bySource.push({ name: s.name, url: s.url, posts: [], error: e.message })
  }
}

const week = isoWeek(new Date())
const inboxDir = path.resolve('docs/digest/inbox')
fs.mkdirSync(inboxDir, { recursive: true })
const out = path.join(inboxDir, `${week}.md`)

const lines = [
  '---',
  `title: RSS 收件箱 ${week}`,
  `date: ${new Date().toISOString().slice(0, 10)}`,
  '---',
  '',
  `# RSS 收件箱 ${week}`,
  '',
  `> 自动聚合近 ${days} 天各信源文章（\`scripts/fetch-feeds.mjs\` 生成）。`,
  '> 用法：挑 3~5 条值得的转进当周周报并写一句话批注，其余忽略；本文件可随时删除。',
  '',
]
for (const s of bySource) {
  lines.push(`## ${s.name}`)
  lines.push('')
  if (s.error) {
    lines.push(`（拉取失败：${s.error}）`, '')
    continue
  }
  if (!s.posts.length) {
    lines.push('（近期无更新）', '')
    continue
  }
  for (const p of s.posts) lines.push(`- [${p.title}](${p.link})`)
  lines.push('')
}
fs.writeFileSync(out, lines.join('\n'))
console.log(`\n草稿已写入 ${out}`)
