export const RequestHandler = async (func = () => {}) => {
    try {
        const data = await func();
        if (data?.body) {
            return data.body;
        }
        return null;
    } catch (e) {
        cy.log(e);
        return null;
    }
};