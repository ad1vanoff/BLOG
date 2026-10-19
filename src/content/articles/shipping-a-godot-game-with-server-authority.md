---
title: Adding server authority to a Godot game after launch
description: The migration path from trust-the-client to trust-the-server for a creature-collection game, without a rewrite.
publishDate: 2026-08-30
tags: [godot, games, supabase]
builds: [aurakeeper]
---
Aurakeeper shipped its first three phases with the client as the source of truth. That was the right call for getting something playable. It's the wrong call for anything with a leaderboard.

## The rule

Every state change that affects another player, or that could be sold, goes through the server. Everything else can stay on the client.

That rule cut the migration list from "everything" to about a dozen actions.

## The shape of each migration

1. Add a server function that validates and applies the action.
2. Make the client call it and apply the server's response.
3. Keep the old client-side path behind a flag for one release.
4. Delete the flag.

## What surprised me

Latency wasn't the problem. Optimistic UI covered it. The problem was error handling: the client had never needed to deal with "no, you can't do that," so every screen needed a path for it.
