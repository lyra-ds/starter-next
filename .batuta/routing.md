# Routing — lyra-ds/starter-next

Local copy (takes precedence over the plugin default). Confirmed with the user
at onboarding, 2026-08-05 — mirrored from ../blade. Full trio installed:
opencode 1.18.3 + codex 0.144.5 (ChatGPT subscription) + claude 2.1.222.
Runtime: compozy (delegations run as managed sessions per `compozy.md`).

| Complexity | Examples                                                                                                        | Executor                               | Cost                 |
| ---------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------- |
| Trivial    | rename, config, copy change, simple unit test                                                                   | opencode + `opencode/kimi-k2.7-code`   | cents (API)          |
| Medium     | isolated feature, bugfix with clear repro                                                                       | codex (default model)                  | ChatGPT subscription |
| Complex    | multi-file feature/refactor that a precise brief can fully specify                                              | codex `-m gpt-5.6-sol`, reasoning high | ChatGPT subscription |
| Critical   | architecture decisions, security-sensitive work, tasks needing the conversation's full context or real judgment | claude (session)                       | Claude subscription  |

## Support lanes

| Role     | Examples                                               | Executor                                          | Cost             |
| -------- | ------------------------------------------------------ | ------------------------------------------------- | ---------------- |
| Research | project map sweep, brief context, "where does X live?" | opencode + `lmstudio/prism-ml/bonsai-27b` (local) | free (local GPU) |

## Rules

The rules from the plugin's default `routing.md` apply unchanged: the
orchestrator classifies and announces in one line; verbal user overrides win;
automatic escalation after 2 failed verifications moves the task one row up;
executor unavailable → next row up (Research has no ladder — the maestro does
the research itself). Model IDs above were discovered via `opencode models` on
this machine; if one disappears, re-run discovery and re-confirm before
delegating.

Research lane specifics (inherited from ../blade, 2026-08-05): requires the
LM Studio server up (`lms server status`; start with `lms server start`).
Server down or model unloaded → fall back to opencode +
`opencode/deepseek-v4-flash` (paid API), loudly. Scout briefs MUST be passed
inline as the `opencode run` argument — never via a temp file in /tmp:
reading outside the project root triggers a permission request that
hangs/auto-rejects in non-interactive mode. Bonsai needs an explicit
relative-paths-only rule in the brief; its reliability log in blade shows
1 clean run vs 3 format failures — if deepseek stays clean there, consider
swapping the lane here too.

Transport log (2026-08-06): Compozy→opencode is broken on this machine —
`session prompt --provider opencode` fails with an internal provider error
(Console: missing `channel_id` upstream); trivial-lane items run via
`opencode run` subprocess until the daemon is fixed. Compozy→codex works
(used for medium lane). The task board's operator run-completion path is
also refused (`invalid claim token`) — board is a partial lens; WORK.md is
the source of truth. kimi hung twice (23min/8min, zero output) on one task
then recovered — cap kimi runs at ~4min and escalate fast. pnpm 11's
default minimumReleaseAge quarantine can silently backpedal freshly
published packages (bit us with eslint-config-next 16.3.0 → 15.5.22);
project has a narrow exclusion for @lyra-ds/* in pnpm-workspace.yaml.

Commit attribution (user request, 2026-08-05): commits of delegated work must
credit the real executor — `Co-Authored-By` trailer for the delegate (e.g.
Codex/opencode model) plus a body line naming who implemented and who
reviewed/verified. Never commit delegate output with maestro-only attribution.
