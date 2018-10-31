export function paginate ({ count, page, size }) {
  return {
    page: +page,
    size: +size,
    row_count: count,
    page_count: Math.ceil(count / size)
  }
}
