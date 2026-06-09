type Props = {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
};

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-[#C37351]
        "
      />
    </div>
  );
}