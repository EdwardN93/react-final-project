import { Button } from "../Button/Button";
export function CustomModal() {
  return (
    <div className="rounded-lg w-1/2 bg-slate-100">
      <div className="flex justify-between items-center w-full p-4 text-start shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900">Delete Car</h3>
        <button className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  dark:hover:bg-gray-600 dark:hover:text-white">
          X
        </button>
      </div>
      <div className="p-4 text-start shadow-sm">
        <p>Are you sure you want to delete car ?</p>
      </div>
      <div className="flex items-center gap-4 p-4">
        <Button text="Accept" />
        <Button text="Decline" color="red" />
      </div>
    </div>
  );
}
