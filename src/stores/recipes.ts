import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/config/api';
import { Recipe } from '@/types/recipes';

export const userecipesStore = defineStore({
  id: 'recipes',
  state: () => ({
    recipes: [] as Recipe[],
    currentRecipe: {} as Recipe,
  }),
  getters: {
    getRecipes: (state) => state.recipes as Recipe[],
    getCurrentRecipe: (state) => state.currentRecipe as Recipe,
    getRecipeById: (state) => {
      return (id: number) => {
        const index = state.recipes.findIndex((recipe: Recipe) => recipe.id === id);
        return index === -1 ? undefined : state.recipes[index];
      };
    },
  },
  actions: {
    async loadRecipes() {
      try {
        const url = '/recipes';
        const { data } = await api.get(url);
        this.recipes = data.data;
        // this.users = this.users.map((user) => {
        //     user.roleName = user.roles?.map((o) => o.name).join(", ");
        //     return user;
        // });
      } catch (err) {
        console.log((err as AxiosError).message);
      }
    },

    async loadRecipeById() {
      try {
        const url = '/recipes';
        const { data } = await api.get(url);
        this.recipes = data.data;
        // this.users = this.users.map((user) => {
        //     user.roleName = user.roles?.map((o) => o.name).join(", ");
        //     return user;
        // });
      } catch (err) {
        console.log((err as AxiosError).message);
      }
    },
    async createRecipe(data: {
      title: string;
      ingredients: string;
      text: string;
      img_url: string;
    }) {
      await api.post('/recipes', data).then(() => {
        console.log('Новый рецепт добавлен');
      });
      await this.loadrecipes();
    },
    async updateRecipe(
      id: number,
      data: {
        title: string;
        ingredients: string;
        text: string;
        img_url: string;
      }
    ) {
      await api.put('/recipes/' + id, data).then(() => {
        console.log('Рецепт изменен');
      });
      await this.loadrecipes();
    },
    async deleteRecipe(id: number) {
      await api.delete('/recipes/' + id).then(() => {
        console.log('Рецепт удален');
      });
      await this.loadrecipes();
    },
  },
});
