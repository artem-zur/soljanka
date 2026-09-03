# Iterative Prompt-based Engineering

When necessary, massive implementation can be splitted into task-based iterations.

## Decision Flow

                            Is it a new module?
                                      │
                     ┌────────────────┴────────────────┐
                     ▼                                 ▼
                   [ NO ]                           [ YES ]
     (feature iteration, refactoring,       (new page, new global store,
      or adding an edge case to same       new API service, or standalone
                component)                          feature)
                     │                                 │
                     ▼                                 ▼
        UPDATE existing `task-*.md`         CREATE `tasks/task-*.md`
             (add check items)            (start clean context window)
                     │                                 │
                     ▼                                 ▼
              Add new Prompt                   Prompt the request
      in the existing context window       in the new context window

## Task Template

The template should not strictly structured, most important - provide as much implementation details as possible and well explain target outcome. If necessary, the task also can be splitted into smaller sub-tasks.

### Task Example

```md
# Task: Pokemon App

## Business Logic

While using the App a User can see the list of available Pokemons, every Pokemon displays: Avatar, ID, and Name.

## Data Contract

export interface Pokemon {
  id: number;
  name: string;
}

export interface PokemonList {
  results: Pokemon[];
}

## Implementation Plan

[ ] Step 1: Create `PokemonListComponent` for rendering a grid layout.
[ ] Step 2: Create `PokemonCardComponent` to display Avatar, ID, and Name.
```

## Prompt Example

```text
Execute ONLY Step 1 from the Implementation Plan in #file:tasks/task-pokemon-app.md.
```