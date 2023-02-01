# AllRecipes - Recipes App

## 📝Description:

Design and develop a Recipes App that included: connection to external API, searches, filtering, ordering, creation, deletion and editing.

#### Used technologies:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Features

__Main page__: landing page with
- [ ] Designed background with css styles
- [ ] Button to enter the home (`Main route`)

__Main route__: contains
- [ ] Search input to find recipes by title
- [ ] Area where the list of recipes will be seen:
  - Image
  - Title
  - Diets
- [ ] Buttons/Options to filter by diet and by existing recipe or added by us
- [ ] Buttons/Options to sort both ascending and descending the recipes by alphabetical order and by rating
- [ ] Paginated to search and display the following recipes, 15 recipes per page, showing the first 15 on the first page.

__Recipe detail path__: contains
- [ ] The fields shown in the main route for each recipe (image, title, and diets)
- [ ] Summary
- [ ] Dish Types
- [ ] Health Score
- [ ] Weight Watcher Smart Points
- [ ] Steps

__Recipe creation route__: contains
- [ ] A form __controlled with JavaScript__ with the following fields:
  - Title
  - Summary
  - Health Score
  - Weight Watcher Smart Points
- [ ] Ability to select/add multiple Diets
- [ ] Ability to select/add multiple Dish Types
- [ ] Button/Option to create a new recipe

__Recipe update route__: contains
- [ ] A form __controllled with JavaScript__ that updates the following fields of the recipes created:
  - Title
  - Summary
  - Health Score
  - Weight Watcher Smart Points
- [ ] Ability to select/add multiple Diets or delete
- [ ] Ability to select/add multiple Dish Types or delete
- [ ] Button/Option to create a new recipe

__Recipe delete route__: contains
- [ ] A button in the created recipe detail that delete the recipe

> All forms are validate with Javascript
