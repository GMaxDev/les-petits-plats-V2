interface Ingredient {
  ingredient: string;
  quantity?: number | string;
  unit?: string;
}

interface Recipe {
  id: number;
  image: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
}

interface CardProps {
  recipe: Recipe;
}

export default function Card({ recipe }: CardProps) {
  return (
    <div className="relative w-[380px] rounded-2xl m-6 shadow-md bg-white">
      <span className="absolute right-4 top-4 bg-dark-yellow px-4 py-1 rounded-3xl">{recipe.time}min</span>
      <img
        className="rounded-t-2xl h-64 object-cover w-[380px]"
        src={`../src/assets/img_recipes/${recipe.image}`}
        alt=""
      />
      <div className="mx-6 font-manrope">
        <h4 className="my-8 font-anton text-xl">{recipe.name}</h4>
        <h5 className="text-lg text-gray-400 mb-4 font-medium">Recette</h5>
        <p>{recipe.description}</p>
        <h5 className="text-lg text-gray-400 my-4 font-medium">Ingrédients</h5>
        <div className="grid grid-cols-2 gap-4 mb-16">
          {recipe.ingredients.map((ing, index) => (
            <div className="flex flex-col flex-wrap" key={index}>
              <h6>{ing.ingredient}</h6>
              <p className="text-gray-400">
              {ing.quantity !== undefined ? `${ing.quantity} ${ing.unit || ''}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
