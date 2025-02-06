interface Props {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, required, children }: Props) {
  return (
    <div className="mt-4">
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
