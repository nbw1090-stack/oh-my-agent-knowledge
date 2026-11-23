// Star 数同步：对 data/*.yml 中 github.com 链接拉取最新 star 数并写回
// 写回采用「文本级行替换」——只改 stars: 数字那一行，保留注释与排版
// 用法：node scripts/sync-stars.mjs   （GITHUB_TOKEN 环境变量可选，可提高速率限制）
import fs from 'node:fs'
import path from 'node:path'
import { DATA_DIR, loadYaml } from './lib.mjs'

const GH_API = 'https://api.github.com/repos'
const token = process.env.GITHUB_TOKEN
const headers = {
  accept: 'application/vnd.github+json',
  'user-agent': 'omak-star-sync/0.1',
  ...(token ? { authorization: `Bearer ${token}` } : {}),
}

function ghRepoSlug(url) {
  const m = url.match(/^https:\/\/github\.com\/([\w.-]+\/[\w.-]+?)(?:\.git)?\/?$/)
  return m ? m[1] : null
}

const files = ['frameworks.yml', 'products.yml', 'extensions.yml', 'papers.yml']
let updated = 0
let failed = 0

for (const f of files) {
  const fp = path.join(DATA_DIR, f)
  let text = fs.readFileSync(fp, 'utf8')
  const items = loadYaml(f) ?? []
  let changed = false

  for (const it of items) {
    const slug = typeof it.url === 'string' ? ghRepoSlug(it.url) : null
    if (!slug) continue
    try {
      const res = await fetch(`${GH_API}/${slug}`, { headers })
      if (!res.ok) {
        failed++
        console.warn(`  ⚠ ${slug}: API ${res.status}`)
        continue
      }
      const stars = (await res.json()).stargazers_count
      if (typeof stars !== 'number' || stars === it.stars) continue

      // 条目以行首 "- " 开始；只在该条目块内替换 stars: 行
      const blocks = text.split(/^(?=- )/m)
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].includes(`url: https://github.com/${slug}`) && /^  stars: \d+$/m.test(blocks[i])) {
          blocks[i] = blocks[i].replace(/^  stars: \d+$/m, `  stars: ${stars}`)
          text = blocks.join('')
          console.log(`  ${slug}: ${it.stars ?? '-'} → ${stars}`)
          updated++
          changed = true
          break
        }
      }
    } catch (e) {
      failed++
      console.warn(`  ⚠ ${slug}: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 300)) // 温和限速
  }

  if (changed) fs.writeFileSync(fp, text)
}

console.log(`\n完成：更新 ${updated} 条，失败 ${failed} 条${token ? '' : '（无 GITHUB_TOKEN，注意 API 速率限制）'}`)
