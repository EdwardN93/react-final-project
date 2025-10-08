export function toStringToUpperCaseTrim(
  input: string | FormDataEntryValue
): string {
  return input.toString().toUpperCase().trim();
}

export function capitalizeFirstLetter(
  input: string | FormDataEntryValue
): string {
  return (
    input.toString().charAt(0).toUpperCase() +
    input.toString().slice(1).toLowerCase()
  );
}
