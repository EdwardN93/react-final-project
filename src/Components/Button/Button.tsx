type Button = {
  text: string;
  color?: "blue" | "red" | "green" | "sky" | "gray"; // Add more Tailwind colors as needed
  width?: boolean;
  onClick?: () => void;
};

export function Button({ text, onClick, width, color = "blue" }: Button) {
  const baseColor = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    sky: "bg-sky-600 hover:bg-sky-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  const wdth = {
    wdth: "w-full",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 text-white rounded duration-300 ${baseColor[color]} ${
        width ? wdth.wdth : ""
      }`}
    >
      {text}
    </button>
  );
}
