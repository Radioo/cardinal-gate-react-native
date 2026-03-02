export interface TestRendererJSON {
    type: string;
    props: Record<string, unknown>;
    children: (TestRendererJSON | string)[] | null;
}
