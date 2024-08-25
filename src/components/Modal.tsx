import { useState } from "react";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  onSubmit: (response: string) => void;
  className?: string;
  onChange: (e: any) => void;
  val: string;
  onBlur: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  val,
}) => {
  const [correctedWord, setCorrectedWord] = useState(val);

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white p-4 rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">Edit Mode</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={val}
            onChange={onChange}
            className="w-full p-2 border rounded mb-4"
          />
        </form>

        <button
          onClick={() => onSubmit(correctedWord)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Insert
        </button>
      </div>
    </div>
  );
};

export default Modal;
