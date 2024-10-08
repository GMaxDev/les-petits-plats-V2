import Card from "./components/card";
import DropdownMenu from "./components/dropdown-menu";
import Header from "./components/header";
import recipesData from "./data/recipes.json";

const App: React.FC = () => {
  const recipesDataNumber: number = recipesData.length;

  // Étape 1: Récupérer les ingrédients, appareils et ustensiles
  const ingredients = new Set<string>();
  const appliances = new Set<string>();
  const utensils = new Set<string>();

  recipesData.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      ingredients.add(ingredient.ingredient);
    });
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach(ustensil => {
      utensils.add(ustensil);
    });
  });

  // Convertir en tableau
  const uniqueIngredients = Array.from(ingredients);
  const uniqueAppliances = Array.from(appliances);
  const uniqueUtensils = Array.from(utensils);

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Header />
      <div className="mx-10 mt-5">
        <section id="searchFilterZone" className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-6 ">
            <DropdownMenu name="Ingrédients" items={uniqueIngredients} />
            <DropdownMenu name="Appareils" items={uniqueAppliances} />
            <DropdownMenu name="Ustensiles" items={uniqueUtensils} />
          </div>
          <p className="font-anton">{recipesDataNumber} recettes</p>
        </section>
        <div className="z-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {recipesData.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
