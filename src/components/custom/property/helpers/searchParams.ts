export function searchParams(
  page: number,
  filter: string | undefined,
  searchString: string | undefined | null
): { page?: number; search?: string } {
  if (searchString && !filter) {

    return { page, search: searchString };
  }
  if (searchString && filter && filter !== 'update') {

    return { page, search: `${searchString} and ${filter}` };
  }
  if (!searchString && filter && filter !== 'update') {

    return { page, search: filter };
  }
  if (searchString && filter && filter === 'update') {

    return { page, search: searchString };
  }

  return { page };
}
