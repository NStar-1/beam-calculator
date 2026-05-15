# Tech Debt

## Project Structure

- Consolidate assets. Imported component assets should live under `src/lib/assets`, public URL assets should live under `static`, and the duplicate `src/assets` / `public/assets` trees should be removed if unused.
- Delete Windows `:Zone.Identifier` metadata files from `public/assets` if they are real files in the repository.
- Move shared utilities from `src/utils` to `src/lib/utils` so app code can import them consistently through `$lib`.
- Normalize folder names when touching related code. Current examples include `Options`, `Ggraphic`, and `ProfileTypes`; prefer lowercase or kebab-case names such as `options`, `graphic`, and `profile-types`.
