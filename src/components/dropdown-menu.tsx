interface DropdownMenuProps {
  name: string;
}

export default function DropdownMenu({name}: DropdownMenuProps) {
  return (
    <div className="">
      <button>{name}</button>
      <h1>test</h1>
    </div>
  );
}
