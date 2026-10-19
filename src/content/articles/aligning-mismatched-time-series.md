---
title: Aligning time series that were never meant to line up
description: Three alignment strategies for mismatched datasets, when each one lies to you, and the one I settled on for Datazipper.
publishDate: 2026-10-01
tags: [data, typescript, visualization]
builds: [datazipper]
featured: true
---
Every "compare these two datasets" project starts the same way: you have a daily series and an hourly series, or a series with gaps and one without, and the very first chart you draw is wrong. Not subtly wrong. Confidently wrong.

This article is about the alignment step: the boring part before the interesting question. I'll cover the three strategies I tried, the failure mode of each, and the hybrid I ended up shipping.

## Strategy 1: Resample everything to the coarsest grain

The obvious move. If one series is hourly and the other daily, average the hourly one into days.

It works until it doesn't. Averaging hides intraday spikes, and "a day" means different things in different time zones. A stock market day is 6.5 hours in New York; a weather day is 24 hours wherever the station is.

## Strategy 2: Interpolate up to the finest grain

Turn the daily series into hourly by interpolating between points.

Now your chart is smooth and your conclusions are fiction. Interpolated points carry no information, and any correlation you compute is partly measuring your own interpolation.

## Strategy 3: Nearest-neighbor joins with a tolerance

For each point in series A, find the closest point in series B within a window. Drop pairs without a match.

This is honest. It's also lossy in a way that's hard to explain to someone looking at the chart, because the gaps move around depending on the tolerance.

## What shipped

A nearest-neighbor join for the data, with a resampled view for the chart, and the tolerance shown in the UI so nobody can miss it.

```ts
export function alignNearest(a: Point[], b: Point[], toleranceMs: number) {
  const out: [Point, Point][] = [];
  let j = 0;
  for (const p of a) {
    while (j < b.length - 1 && Math.abs(b[j + 1].t - p.t) <= Math.abs(b[j].t - p.t)) j++;
    if (Math.abs(b[j].t - p.t) <= toleranceMs) out.push([p, b[j]]);
  }
  return out;
}
```

Two pointers, one pass, and the tolerance is the only knob.

## The takeaway

Alignment is a modeling decision, not a preprocessing step. Make it visible.
