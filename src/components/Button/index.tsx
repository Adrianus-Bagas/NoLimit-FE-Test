export const Button = ({
  label,
  handleClick,
  disabled = false,
}: {
  label: string;
  handleClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <>
      <div
        className={`bg-black text-white p-2 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-70"}`}
        onClick={!disabled ? handleClick : undefined}
      >
        {label}
      </div>
    </>
  );
};
