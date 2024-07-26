import {exampleSelectorWithClass} from "../../constants/Classes";

export const exampleSelector = '#start';
export const exampleSelectorWithDataCy = exampleSelectorWithClass();

export function exampleFunction() {
    cy.get(exampleSelector).click();
}