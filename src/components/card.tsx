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
      <span className="absolute px-4 py-1 right-4 top-4 bg-dark-yellow rounded-3xl">{recipe.time}min</span>
      <img
        className="rounded-t-2xl h-64 object-cover w-[380px]"
        src={`assets/img_recipes/${recipe.image}`}
        alt=""
      />
      <div className="mx-6 font-manrope">
        <h4 className="my-8 text-xl font-anton">{recipe.name}</h4>
        <h5 className="mb-4 text-lg font-medium text-gray-400">Recette</h5>
        <p className="h-36 line-clamp-4">{recipe.description}</p>
        <h5 className="my-4 text-lg font-medium text-gray-400">Ingrédients</h5>
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
