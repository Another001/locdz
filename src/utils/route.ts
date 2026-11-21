export function splitRouteName(routeName: string): [string, string] {
  const parts = routeName
    .split(/\s+(?:-|–|—|→|->|đi|đến)\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(" - ")];
  }

  return [routeName.trim(), ""];
}