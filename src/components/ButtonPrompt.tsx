import { useState } from "react";

type Props = {
  buttonText: string;
  confirmText?: string;
  cancelText?: string;
  promptText?: string;
  onConfirm: () => void;
};
export default function ButtonPrompt({
  buttonText,
  onConfirm,
  promptText,
  confirmText = "Yes",
  cancelText = "No",
}: Props) {
  const [promptOpen, setPromptOpen] = useState(false);

  const openPrompt = () => {
    console.log("Prompt");
    setPromptOpen(true);
  };

  const confirmSelection = () => {
    onConfirm();
  };

  const cancelSelection = () => {
    setPromptOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openPrompt}>
        {buttonText}
      </button>
      {promptOpen && (
        <div>
          {promptText && <p>{promptText}</p>}
          <button type="button" onClick={confirmSelection}>
            {confirmText}
          </button>
          <button type="button" onClick={cancelSelection}>
            {cancelText}
          </button>
        </div>
      )}
    </div>
  );
}
