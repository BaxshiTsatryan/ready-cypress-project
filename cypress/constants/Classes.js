export function dataCy(selector) {
    return `[data-cy="${selector}"]`;
}

export const exampleSelectorWithClass = () => dataCy('css_selector');