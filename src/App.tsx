import Card from "./components/card";
import DropdownMenu from "./components/dropdown-menu";
import Header from "./components/header";
import recipesData from "./data/recipes.json";

const App: React.FC = () => {
  const recipesDataNumber: number = recipesData.length

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Header />
      <div className="mx-10 mt-5">

      <section id="searchFilterZone" className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row gap-6 ">
          <DropdownMenu name="Ingrédients"/>
          <DropdownMenu name="Appareils"/>
          <DropdownMenu name="Ustensiles"/>
        </div>
        <p className="font-anton">{recipesDataNumber} recettes</p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {recipesData.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default App;
