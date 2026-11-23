// 共享工具：加载/保存 data/*.yml，HTTP 请求封装
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const DATA_DIR = path.join(ROOT, 'data')

export function loadYaml(file) {
  // JSON_SCHEMA：日期保持字符串，避免 Date 对象破坏排序/比较
  return yaml.load(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'), { schema: yaml.JSON_SCHEMA })
}

export function saveYaml(file, data) {
  const out = yaml.dump(data, { lineWidth: 120, noRefs: true })
  fs.writeFileSync(path.join(DATA_DIR, file), out)
}

// 收集所有 data/*.yml 中的 url 字段（含 must-read 子链接）
export function collectUrls() {
  const results = [] // {url, from}
  for (const f of fs.readdirSync(DATA_DIR).filter((x) => x.endsWith('.yml'))) {
    const items = loadYaml(f) ?? []
    for (const it of items) {
      if (typeof it.url === 'string' && it.url.startsWith('http')) {
        results.push({ url: it.url, from: `data/${f}#${it.name ?? ''}` })
      }
      for (const mr of it.must_read ?? []) {
        if (typeof mr.url === 'string') {
          results.push({ url: mr.url, from: `data/${f}#${it.name}/must-read` })
        }
      }
    }
  }
  return results
}

// 带超时与重试的 HEAD/GET 探测；对 HEAD 不支持的服务回退 GET（只取响应头即中断）
export async function probeUrl(url, { timeoutMs = 12000 } = {}) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), timeoutMs)
    try {
      let res = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: ac.signal,
        headers: { 'user-agent': 'omak-link-checker/0.1' },
      })
      if (res.status === 405 || res.status === 403 || res.status === 501) {
        res = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          signal: ac.signal,
          headers: { 'user-agent': 'omak-link-checker/0.1' },
        })
        // 不读 body，连接随 GC 关闭
      }
      if (res.status < 400) return { ok: true, status: res.status }
      if (res.status >= 500 && attempt === 0) continue // 5xx 重试一次
      return { ok: false, status: res.status }
    } catch (e) {
      if (attempt === 1) return { ok: false, status: 0, error: String(e.message ?? e) }
    } finally {
      clearTimeout(timer)
    }
  }
  return { ok: false, status: 0 }
}
