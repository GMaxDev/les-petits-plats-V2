import React, { useState, useEffect } from 'react';
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

  // Fonction pour ajouter un filtre
  const handleAddFilter = (filterType: keyof typeof selectedFilters, filterValue: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: [...prev[filterType], filterValue],
    }));
  };

  // Fonction pour supprimer un filtre
  const handleRemoveFilter = (filterType: keyof typeof selectedFilters, filterValue: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((item) => item !== filterValue),
    }));
  };

  // Filtrer les recettes en fonction des filtres
  useEffect(() => {
    const filtered = recipesData.filter((recipe) => {
      const matchIngredients = selectedFilters.ingredients.every((ingredient) =>
        recipe.ingredients.some((ing) => ing.ingredient === ingredient)
      );
      const matchAppliances = selectedFilters.appliances.length
        ? selectedFilters.appliances.includes(recipe.appliance)
        : true;
      const matchUtensils = selectedFilters.utensils.every((utensil) =>
        recipe.ustensils.includes(utensil)
      );

      return matchIngredients && matchAppliances && matchUtensils;
    });

    setFilteredRecipes(filtered);
  }, [selectedFilters]);

  // Mettre à jour les éléments des dropdowns en fonction des recettes filtrées
  const filteredIngredients = new Set<string>();
  const filteredAppliances = new Set<string>();
  const filteredUtensils = new Set<string>();

  filteredRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      filteredIngredients.add(ingredient.ingredient);
    });
    filteredAppliances.add(recipe.appliance);
    recipe.ustensils.forEach(utensil => {
      filteredUtensils.add(utensil);
    });
  });

  const uniqueFilteredIngredients = Array.from(filteredIngredients);
  const uniqueFilteredAppliances = Array.from(filteredAppliances);
  const uniqueFilteredUtensils = Array.from(filteredUtensils);

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Header />
      <div className="mx-10 mt-5">
        <section id="searchFilterZone" className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-6 ">
            {/* Dropdowns */}
            <DropdownMenu
              name="Ingrédients"
              items={uniqueFilteredIngredients}
              onSelect={(item) => handleAddFilter("ingredients", item)}
            />
            <DropdownMenu
              name="Appareils"
              items={uniqueFilteredAppliances}
              onSelect={(item) => handleAddFilter("appliances", item)}
            />
            <DropdownMenu
              name="Ustensiles"
              items={uniqueFilteredUtensils}
              onSelect={(item) => handleAddFilter("utensils", item)}
            />
          </div>

          {/* Nombre de recettes filtrées */}
          <p className="font-anton">{filteredRecipes.length} recettes</p>
        </section>

        {/* Affichage des filtres actifs */}
        <div className="flex gap-4 mt-4">
          {selectedFilters.ingredients.map((ingredient, index) => (
            <FilterTag
              key={index}
              name={ingredient}
              onRemove={() => handleRemoveFilter("ingredients", ingredient)}
            />
          ))}
          {selectedFilters.appliances.map((appliance, index) => (
            <FilterTag
              key={index}
              name={appliance}
              onRemove={() => handleRemoveFilter("appliances", appliance)}
            />
          ))}
          {selectedFilters.utensils.map((utensil, index) => (
            <FilterTag
              key={index}
              name={utensil}
              onRemove={() => handleRemoveFilter("utensils", utensil)}
            />
          ))}
        </div>

        {/* Affichage des recettes filtrées */}
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
