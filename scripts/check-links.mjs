// 死链校验：扫描 data/*.yml 中所有链接，输出报告（不改文件）
// 用法：node scripts/check-links.mjs [--concurrency 8]
import { collectUrls, probeUrl } from './lib.mjs'
import fs from 'node:fs'

const args = process.argv.slice(2)
const concurrency = Number(args[args.indexOf('--concurrency') + 1] ?? 8) || 8

const urls = collectUrls()
const seen = new Map()
for (const { url, from } of urls) {
  if (!seen.has(url)) seen.set(url, [])
  seen.get(url).push(from)
}

console.log(`共 ${urls.length} 条链接（去重后 ${seen.size}），并发 ${concurrency}，开始检查…`)

const dead = []
let done = 0
const queue = [...seen.entries()]
async function worker() {
  while (queue.length) {
    const [url, from] = queue.shift()
    const r = await probeUrl(url)
    done++
    if (done % 20 === 0) console.log(`  进度 ${done}/${seen.size}`)
    if (!r.ok) dead.push({ url, from, status: r.status, error: r.error })
  }
}
await Promise.all(Array.from({ length: concurrency }, worker))

const reportPath = 'link-check-report.json'
fs.writeFileSync(reportPath, JSON.stringify({ checkedAt: new Date().toISOString(), total: seen.size, dead }, null, 2))

if (dead.length) {
  console.log(`\n❌ 发现 ${dead.length} 条疑似死链（详见 ${reportPath}）：`)
  for (const d of dead) {
    console.log(`  [${d.status || 'ERR'}] ${d.url}`)
    console.log(`        ← ${d.from[0]}`)
  }
  console.log('\n注：403/反爬拦截可能是误报，人工确认后再删条目。')
} else {
  console.log(`\n✅ 全部 ${seen.size} 条链接可访问。报告已写入 ${reportPath}`)
}
