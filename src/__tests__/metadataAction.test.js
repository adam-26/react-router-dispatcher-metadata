import getMetadataAction, { METADATA } from "../metadataAction";

describe('metadataAction', () => {
    let action;

    beforeEach(() => {
        action = getMetadataAction();
    });

    test('name', () => {
       expect(action.name).toBe(METADATA);
    });

    describe('initServerAction', () => {
        test('assigns a metadata instance', () => {
            const params = {};
            const props = action.initServerAction(params);

            expect(props.metadata).toBeDefined();
        });

        test('retains existing instance', () => {
            const md = { hello: 'world' };
            const params = { metadata: md };
            const props = action.initServerAction(params);

            expect(props.metadata).toEqual(md);
        });
    });

    describe('initClientAction', () => {
        test('assigns a metadata instance', () => {
            const params = {};
            const props = action.initClientAction(params);

            expect(props.metadata).toBeDefined();
        });

        test('retains existing instance', () => {
            const md = { hello: 'world' };
            const params = { metadata: md };
            const props = action.initClientAction(params);

            expect(props.metadata).toEqual(md);
        });
    });

    describe('filterParamsToProps', () => {
        test('assigns props from action factory', () => {
            const md = { hello: 'world' };
            const params = { random: 1, metadata: md };
            action = getMetadataAction();

            const props = action.filterParamsToProps(params, {});
            expect(props.metadata).toEqual(md);
            expect(props.random).not.toBeDefined();
        });
    });

    describe('hoc', () => {
        test('wraps component', () => {
            const TestComponent = () => {};
            TestComponent.getMetadata = () => {};
            const HOC = action.hoc(TestComponent);

            expect(typeof HOC.preloadMetadata).toBe('function');
        });
    });
});
