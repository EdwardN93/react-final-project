import { Button } from "../Button/Button";
import { ModalProps } from "../Types/Types";

export function CustomModal({
  title,
  message,
  onConfirm,
  onCancel,
  showCancelBtn,
  confirmBtnMessage,
  declineBtnMessage,
}: ModalProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 w-full">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{title ?? "Notification"}</h2>
        <p className="mb-6">{message ?? ""}</p>
        <div className="flex justify-center gap-2">
          <Button text={confirmBtnMessage ?? "OK"} onClick={onConfirm} width />
          {showCancelBtn && (
            <Button
              text={declineBtnMessage ?? "Cancel"}
              color="red"
              onClick={onCancel}
              width
            />
          )}
        </div>
      </div>
    </div>
  );
}
