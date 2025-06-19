export function getAccessToken() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  if (!user) return;
  return user ? JSON.parse(user) : null;
}
