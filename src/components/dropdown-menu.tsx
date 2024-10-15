import { useState } from "react";
interface DropdownMenuProps {
  name: string;
  items: string[];
  onSelect: (item: string) => void;
}

export default function DropdownMenu({ name, items, onSelect }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-40">
      <button
        onClick={toggleMenu}
        className={`flex flex-row justify-between w-full px-4 py-3 text-sm bg-white rounded-lg ${isOpen ? 'rounded-none rounded-t-lg' : ''}`}
      >
        {name}
        <img
          src="public/assets/arrow-up.png"
          alt=""
          className={`size-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full px-2 pb-2 bg-white rounded-b-lg">
          <input
            type="text"
            className="w-full px-4 py-2 pr-6 border border-gray-300"
            placeholder={`Rechercher des ${name.toLowerCase()}`}
          />
          <ul className="mt-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="px-2 py-1 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => onSelect(item)} // Sélectionner un filtre
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
