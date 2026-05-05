---
name: reviewer
description: RETIRED — This agent has been removed from the pipeline. Do not invoke.
tools: []
---

# Reviewer Agent — RETIRED

This agent has been removed from the SBP agent pipeline.

The active pipeline is:

```
planner → frontend → backend → content
```

Do not dispatch this agent. Do not reference it in task plans.

If you are looking for quality checks, each specialist agent (frontend, backend, content) carries its own delivery checklist and validation steps in its output contract.
- Schema only where content supports it

### 8. Security (for backend surfaces)
- All inputs validated server-side
- No secrets in client code
- Error responses do not leak internals

## Output Contract

```md
## Review Decision
Status: approved | changes-requested | blocked

## Findings
| Severity | Area | File | Issue | Required Action |
| --- | --- | --- | --- | --- |

## Verification
- Acceptance criteria coverage:
- Checks performed:
- Residual risk:
```

## Severity Guide

- `high`: broken behavior, security flaw, accessibility blocker, design system violation, or major acceptance miss
- `medium`: regression risk, SEO gap, performance issue, incomplete edge case
- `low`: polish, minor maintainability, optional improvement

## Approval Checklist

- [ ] Issue requirements met
- [ ] PR targets `harvestt` — not `main`
- [ ] No inline Tailwind in JSX
- [ ] No arbitrary values — all tokens used
- [ ] No hardcoded nav, footer, social, or config content — all from `/data`
- [ ] No blocker-level accessibility defects
- [ ] No obvious security gaps on public inputs
- [ ] Metadata coherent and route-unique
- [ ] Responsive on mobile and desktop confirmed