# ADR 0003 — Read-only Default for Figma

Status: Accepted  
Date: 2026-09-18

## Decision

Agent access to Figma is read-only by default.

A user request to inspect, review, plan, audit, document, or update this repo does not imply permission to change Figma.

A write action requires an explicit create/edit/fix instruction in the current task.

## Why

This prevents accidental cleanup/migration while agents are gathering evidence and keeps design-system decisions auditable.
