export function generatePassword(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-=+_/*";
  let string = "";
  for (let i = 0; i <= length; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return string;
}
