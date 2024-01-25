export function searchParams(
  page: number,
  filter: string | undefined,
  searchString: string | undefined | null
): { page?: number; search?: string } {
  if (searchString && !filter) {
    console.log('1');

    return { page, search: searchString };
  }
  if (searchString && filter && filter !== 'update') {
    console.log('2');

    return { page, search: `${searchString} and ${filter}` };
  }
  if (!searchString && filter && filter !== 'update') {
    console.log('3');

    return { page, search: filter };
  }
  if (searchString && filter && filter === 'update') {
    console.log('4');

    return { page, search: searchString };
  }
  console.log('5');

  return { page };
}
