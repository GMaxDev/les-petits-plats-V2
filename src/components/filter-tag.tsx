interface FilterTagProps {
  name: string;
  onRemove: () => void;
}

export default function FilterTag({ name, onRemove }: FilterTagProps) {
  return (
    <div className="flex justify-between px-5 py-3 rounded-lg bg-dark-yellow">
      <span>{name}</span>
      <button
        onClick={onRemove}
        className="ml-2 font-bold"
      >
        x
      </button>
    </div>
  );
}
