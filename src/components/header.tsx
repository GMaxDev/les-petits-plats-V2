export default function Header() {
  return (
    <div className="bg-header bg-cover h-[600px] font-anton w-full bg-slate-400 px-16 pt-12">
      <h1 className="text-2xl uppercase text-white">Les Petits Plats</h1>
      <div className="mt-40 flex items-center flex-col text-center">
        <h2 className="text-3xl text-dark-yellow w-2/4">
          CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET
          DÉLICIEUSES
        </h2>
        <div className="flex justify-center my-8 w-full">
          <input
            className="py-4 pl-6 pr-14 w-2/3 rounded-md text-sm font-manrope"
            type="text"
            name="recipe"
            placeholder="Rechercher une recette, un ingrédient, ..."
          />
        </div>
      </div>
    </div>
  );
}
