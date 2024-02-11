import { useFormStatus } from "react-dom";

type PropTypes = {
  defaultText: string;
  pendingText: string;
};

const UploadButton = ({ defaultText, pendingText }: PropTypes) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="mt-3 w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg px-4 py-2.5 font-medium text-sm text-center duration-150"
      type="submit"
      disabled={pending}
    >
      {!pending ? defaultText : pendingText}
    </button>
  );
};

export default UploadButton;
