export const compress = (bible) =>
  bible.map(book =>
    book.map(chapter =>
      chapter.map(({ n, txt }) =>
        `${n}|${txt}`
      ).join('')
    ).join('||')
  ).join('|||')

export const uncompress = (bible) =>
  bible.split('|||').map(book =>
    book.split('||').map(unflattenChapter)
  )

const unflattenChapter = chapter =>
  chapter
    .replace(/\d+\|/g, match => `||${match}`)
    .substr(2)
    .split('||')
    .map(verse => {
      const [n, txt] = verse.split('|')
      return { n, txt }
    })
