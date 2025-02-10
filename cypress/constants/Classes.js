export function dataCy(selector) {
    return `[data-cy="${selector}"]`;
}

export const exampleSelectorWithClass = () => dataCy('css_selector');
export const exampleSelectorWithClass2 = () => dataCy('css_selector2');
export const exampleSelectorWithClass3 = () => dataCy('css_selector3');