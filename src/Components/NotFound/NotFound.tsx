import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col m-0 my-auto gap-4">
      <h2 className="text-xl font-semibold">404 Page Not Found</h2>
      <p>
        Click{" "}
        <Link
          to="/"
          className="text-blue-600 hover:text-red-600 active:text-red-700 duration-200"
        >
          HERE
        </Link>{" "}
        to go Home
      </p>
    </div>
  );
}
