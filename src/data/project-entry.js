export function projectFromEntry(entry) {
  return {
    slug: entry.id.replace(/\.(json|md)$/, ""),
    ...entry.data,
  };
}

export function sortProjects(projects) {
  return projects.toSorted((first, second) => first.order - second.order);
}
