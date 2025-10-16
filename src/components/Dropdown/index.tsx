import {years} from "@/constants";

export const Dropdown = ({
  label,
  value,
  handleChange,
}: {
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string) => void;
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p>{label}</p>
        <select
          className="border-2 border-black p-1"
          value={value}
          onChange={handleChange ? (event) => handleChange(event.target.value) : undefined}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
