import {exampleSelector, exampleSelectorWithDataCy} from '../fixtures/pages/example';

export const MAIN_URL = 'https://www.automationexercise.com/';

export const PRODUCTS_URL = `${MAIN_URL}products`;
export const CART_URL = `${MAIN_URL}view_cart`;

export const urlsForGlobalChecks = [
    PRODUCTS_URL,
    CART_URL
];

export const urlsFor404HunterClient = [
    {entryUrl: MAIN_URL, selector: exampleSelector, url: PRODUCTS_URL},
    {entryUrl: MAIN_URL, selector: exampleSelectorWithDataCy, url: CART_URL},
    {entryUrl: CART_URL, selector: exampleSelector, url: PRODUCTS_URL}
];