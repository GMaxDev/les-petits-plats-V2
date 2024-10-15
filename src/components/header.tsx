interface HeaderProps {
  onSearchChange: (query: string) => void;
}

export default function Header({ onSearchChange }: HeaderProps) {
  return (
    <div className="bg-header bg-cover h-[600px] font-anton w-full bg-slate-400 px-16 pt-12">
      <h1 className="text-2xl text-white uppercase">Les Petits Plats</h1>
      <div className="flex flex-col items-center mt-40 text-center">
        <h2 className="w-2/4 text-3xl text-dark-yellow">
          CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
        </h2>
        <div className="flex justify-center w-full my-8">
          <input
            className="w-2/3 py-4 pl-6 text-sm rounded-md pr-14 font-manrope"
            type="text"
            name="recipe"
            placeholder="Rechercher une recette, un ingrédient, ..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
