---
title: Knowing before your Supabase free tier runs out
description: How I monitor database size, bandwidth, and edge function invocations across every project so the upgrade is a decision, not an outage.
publishDate: 2026-09-18
tags: [supabase, ops, dashboards]
builds: [analytics-dashboard]
---
I run a lot of small apps on Supabase. Most of them fit comfortably on the free tier. The problem is that "most" is doing a lot of work in that sentence, and the one that doesn't fit will tell you by going read-only.

## What actually gets you

In rough order of how often it's bitten me:

1. **Database size.** Logs tables grow quietly. A game that writes one row per match adds up.
2. **Edge function invocations.** Polling clients are the usual culprit.
3. **Egress.** Serving images from Storage instead of a CDN.

## The check

A scheduled job queries each project's usage endpoint, compares it to the plan limit, and posts a warning at 70% and again at 90%. The numbers go on one dashboard with the rest of the portfolio.

## What changed

Two projects got moved to a paid plan before they needed it. One got its polling replaced with realtime subscriptions and dropped off the warning list entirely.

The upgrade decision is boring now. That's the goal.
