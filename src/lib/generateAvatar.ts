export function generateAvatarUrl(fullName: string) {
  const seed = encodeURIComponent(fullName);
  return `https://api.dicebear.com/6.x/initials/svg?seed=${seed}`;
}
