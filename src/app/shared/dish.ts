//create a dish class and import to dishes[]
//Now we can use both of the classes to dishservies service.
//Then i add the router the router app and app module.
//Through the data binding now i render angular elements to the html template (home and about components)

import { Comment } from './comments';
export class Dish {
    id: string;
    name: string;
    image: string;
    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;
    comments:Comment[];
}