import {TestRendererJSON} from './types';

export function findAll(
    node: TestRendererJSON | null,
    predicate: (n: TestRendererJSON) => boolean,
): TestRendererJSON[] {
    if (!node) return [];
    const results: TestRendererJSON[] = [];
    if (predicate(node)) results.push(node);
    if (node.children) {
        for (const child of node.children) {
            if (typeof child !== 'string') {
                results.push(...findAll(child, predicate));
            }
        }
    }
    return results;
}

export function findAllInArray(
    nodes: (TestRendererJSON | string)[],
    predicate: (n: TestRendererJSON) => boolean,
): TestRendererJSON[] {
    const results: TestRendererJSON[] = [];
    for (const node of nodes) {
        if (typeof node !== 'string') {
            results.push(...findAll(node, predicate));
        }
    }
    return results;
}

export function collectAllText(nodes: (TestRendererJSON | string)[]): string[] {
    const texts: string[] = [];
    for (const node of nodes) {
        if (typeof node === 'string') {
            texts.push(node);
        } else if (node.children) {
            texts.push(...collectAllText(node.children));
        }
    }
    return texts;
}
