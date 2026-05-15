# components/ui — shadcn-style primitives

Files in this directory use single-quote imports and named `export {X}` exports.

This deviates from the rest of the codebase (double-quote imports, default
exports) by intent: it preserves source-level diffability with the upstream
[react-native-reusables](https://github.com/founded-labs/react-native-reusables)
templates so future updates apply cleanly.

When adding a new primitive here, match this style. For anything else —
shared layouts, screens, hooks — follow the project's default convention.
