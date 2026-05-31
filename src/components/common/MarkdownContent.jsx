const blockStartPattern = /^(#{1,4}\s+|[-*]\s+|\d+\.\s+|>\s+)/

const parseInline = (text) => {
  const parts = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g
  let lastIndex = 0
  let match

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${match.index}-${token}`

    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={key} className="font-bold text-slate-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={key} className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.9em] font-semibold text-slate-800 dark:text-slate-100">
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>
      )
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

const collectList = (lines, startIndex, ordered) => {
  const items = []
  let index = startIndex
  const pattern = ordered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/

  while (index < lines.length) {
    const match = lines[index].match(pattern)
    if (!match) break
    items.push(match[1])
    index += 1
  }

  return { items, nextIndex: index }
}

const parseBlocks = (text) => {
  const lines = String(text || '').replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] })
      index += 1
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const { items, nextIndex } = collectList(lines.map((item) => item.trim()), index, false)
      blocks.push({ type: 'list', ordered: false, items })
      index = nextIndex
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const { items, nextIndex } = collectList(lines.map((item) => item.trim()), index, true)
      blocks.push({ type: 'list', ordered: true, items })
      index = nextIndex
      continue
    }

    if (/^>\s+/.test(line)) {
      blocks.push({ type: 'quote', text: line.replace(/^>\s+/, '') })
      index += 1
      continue
    }

    const paragraph = [line]
    index += 1
    while (index < lines.length) {
      const nextLine = lines[index].trim()
      if (!nextLine || blockStartPattern.test(nextLine)) break
      paragraph.push(nextLine)
      index += 1
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
  }

  return blocks
}

export default function MarkdownContent({ text, fallback = '', compact = false, className = '' }) {
  const content = text || fallback
  const blocks = parseBlocks(content)

  if (blocks.length === 0) return null

  return (
    <div className={`space-y-3 text-slate-700 dark:text-slate-300 ${compact ? 'text-sm leading-relaxed' : 'leading-relaxed'} ${className}`}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Tag = block.level <= 2 ? 'h3' : 'h4'
          return (
            <Tag key={index} className={`${compact ? 'text-sm' : 'text-base'} font-black text-slate-900 dark:text-white`}>
              {parseInline(block.text)}
            </Tag>
          )
        }

        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul'
          return (
            <Tag key={index} className={`${block.ordered ? 'list-decimal' : 'list-disc'} space-y-2 pl-5`}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1">
                  {parseInline(item)}
                </li>
              ))}
            </Tag>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={index} className="border-l-4 border-brand/50 pl-4 italic text-slate-600 dark:text-slate-400">
              {parseInline(block.text)}
            </blockquote>
          )
        }

        return (
          <p key={index}>
            {parseInline(block.text)}
          </p>
        )
      })}
    </div>
  )
}
