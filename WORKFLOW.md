# Claude Code Development Workflow

## 🔴 GOLDEN RULE
**COMMIT IMMEDIATELY when Claude Code finishes building.**

## Checklist

### When Claude Code Finishes
1. ✅ Verify it runs (npm run dev, tests pass)
2. ✅ **STOP the process**
3. ✅ Check: `git status`
4. ✅ Add all: `git add .`
5. ✅ Commit: `git commit -m "Add [feature]"`
6. ✅ Push: `git pushall`
7. ✅ **NOW test/iterate**

### When Switching Machines
1. ✅ Pull first: `git pull origin main`
2. ✅ Install if needed: `npm install`
3. ✅ Start working

## Why
Git hook will warn you, but discipline is better.
Commits are free. Frustration is expensive.

## Your Setup
- **Surface Pro (Windows):** PowerShell, Node v24, Claude Code 2.1.42
- **Ubuntu (Obelix):** bash, Node v20, Claude Code 2.1.38
- **Git remotes:** GitHub (origin) + Proxmox homelab
- **Commands work identically on both platforms**
