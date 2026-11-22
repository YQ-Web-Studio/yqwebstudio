# YQ Web Studio Engineering Workflow & Governance

All contributors and AI agents working in this repository must strictly adhere to the company-standard engineering workflow:

## 1. Branching & Commit Conventions
- Work is organized around Jira tickets under project key `YQWS`.
- **Never commit directly to `main`**. All work begins on an isolated branch: `<type>/<TICKET-KEY>-<description>` (e.g. `feat/YQWS-5-case-studies`).
- Commit messages: `[YQWS] type(scope): description (YQWS-n)`.
- PR titles: `[YQWS] type(scope): description (YQWS-n)`.

## 2. Mandatory Approval Gates
1. **Gate 1 (Automated AI Review - CodeRabbit):** CodeRabbit automated approval is mandatory before human code review. CodeRabbit is strictly configured to evaluate only changed files; legacy code outside the diff is non-blocking.
2. **Gate 2 (Human Lead Review - Yusuf Qureshi):** Final architectural and functional review authorization before merge.
3. **Gate 3 (PR Confirmation):** Human review of PR summary, visual proof, and test results before opening.

## 3. Mandatory PR Skill Rule (Hard-Gate)
> **The `automated-pr-creator` skill MUST ALWAYS be used whenever any Pull Request is created.**  
> Manual or ad-hoc PR creation without this skill is strictly forbidden. The skill ensures 100% pre-filled Ultra-Lean templates, Playwright visual evidence, and test metrics.