import { Button } from "../Button/Button";
import { ModalProps } from "../Types/Types";

export function CustomModal({
  title,
  message,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-2">
          <Button text="Da" onClick={onConfirm} width />
          <Button text="Nu" color="red" onClick={onCancel} width />
        </div>
      </div>
    </div>
  );
}
