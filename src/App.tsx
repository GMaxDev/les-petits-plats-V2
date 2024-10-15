import { useEffect, useState } from "react";
import Card from "./components/card";
import DropdownMenu from "./components/dropdown-menu";
import Header from "./components/header";
import FilterTag from "./components/filter-tag";
import recipesData from "./data/recipes.json";

const App: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    ingredients: [] as string[],
    appliances: [] as string[],
    utensils: [] as string[],
  });
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddFilter = (filterType: keyof typeof selectedFilters, filterValue: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: [...prev[filterType], filterValue],
    }));
  };

  const handleRemoveFilter = (filterType: keyof typeof selectedFilters, filterValue: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((value) => value !== filterValue),
    }));
  };

  // Fonction pour mettre à jour les recettes filtrées en fonction des filtres appliqués
  useEffect(() => {
    const filtered = recipesData.filter((recipe) => {
      const matchIngredients = selectedFilters.ingredients.every((ingredient) =>
        recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(ingredient.toLowerCase()))
      );
      const matchAppliances = selectedFilters.appliances.length
        ? selectedFilters.appliances.includes(recipe.appliance)
        : true;
      const matchUtensils = selectedFilters.utensils.every((utensil) =>
        recipe.ustensils.includes(utensil)
      );

      const matchSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchIngredients && matchAppliances && matchUtensils && matchSearch;
    });

    setFilteredRecipes(filtered);
  }, [selectedFilters, searchQuery]);

  // Mettre à jour les listes d'items filtrés pour les menus déroulants
  const uniqueIngredients = Array.from(
    new Set(filteredRecipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient)))
  );
  const uniqueAppliances = Array.from(
    new Set(filteredRecipes.map(recipe => recipe.appliance))
  );
  const uniqueUtensils = Array.from(
    new Set(filteredRecipes.flatMap(recipe => recipe.ustensils))
  );

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Header onSearchChange={(query) => setSearchQuery(query)} />
      <div className="mx-10 mt-5">
        <section id="searchFilterZone" className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-6 ">
            <DropdownMenu
              name="Ingrédients"
              items={uniqueIngredients}
              onSelect={(item) => handleAddFilter('ingredients', item)}
            />
            <DropdownMenu
              name="Appareils"
              items={uniqueAppliances}
              onSelect={(item) => handleAddFilter('appliances', item)}
            />
            <DropdownMenu
              name="Ustensiles"
              items={uniqueUtensils}
              onSelect={(item) => handleAddFilter('utensils', item)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([key, filters]) =>
              filters.map((filter) => (
                <FilterTag
                  key={`${key}-${filter}`}
                  name={filter}
                  onRemove={() => handleRemoveFilter(key as keyof typeof selectedFilters, filter)}
                />
              ))
            )}
          </div>
        </section>
        <div className="z-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
