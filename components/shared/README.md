# components/shared/

Cross-game, cross-screen components.

## Placement rule

- **Subdirectories** (`chip/`, `feedback/`, `layout/`, `modal/`) hold cohesive
  clusters of 3+ related primitives. Add a new file to a subdirectory only when
  it clearly belongs to that cluster.
- **Root** holds singletons or small cross-cutting widgets without an obvious
  group: navigation chrome (DrawerMenu), gradient theming (GradientBackground,
  GradientText), one-off rows (ProfileRow, PlayCounts), authenticated image
  (ApiImage), and the pagination strip (Pagination).

If a new root file would form a third sibling with two existing root files,
introduce a subdirectory; otherwise the flat root is the right home.
