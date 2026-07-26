#!/usr/bin/env python3

import json
import argparse
from copy import deepcopy


def reduce_line(points, keep_percent):
    """
    Reduce a coordinate array while always keeping
    the first and last point.
    """

    n = len(points)

    if n <= 2:
        return points

    # Number of points to keep
    keep = max(2, round(n * keep_percent))

    # Can't keep more than exist
    keep = min(keep, n)

    if keep == n:
        return points

    result = [points[0]]

    interior = n - 2
    interior_keep = keep - 2

    if interior_keep > 0:
        step = interior / (interior_keep + 1)

        used = set()

        for i in range(interior_keep):
            idx = round((i + 1) * step)

            idx = max(1, min(n - 2, idx))

            while idx in used and idx < n - 2:
                idx += 1

            used.add(idx)
            result.append(points[idx])

    result.append(points[-1])

    return result


def simplify_coords(coords, keep_percent):
    """
    Recursively traverse GeoJSON coordinates.
    """

    # Leaf coordinate array [lon, lat]
    if (
        isinstance(coords, list)
        and len(coords) >= 2
        and isinstance(coords[0], (int, float))
    ):
        return coords

    # LineString / LinearRing
    if (
        isinstance(coords, list)
        and len(coords) > 0
        and isinstance(coords[0], list)
        and len(coords[0]) >= 2
        and isinstance(coords[0][0], (int, float))
    ):
        return reduce_line(coords, keep_percent)

    # Nested geometry
    return [simplify_coords(c, keep_percent) for c in coords]


def simplify_geojson(data, keep_percent):

    out = deepcopy(data)

    for feature in out.get("features", []):
        geom = feature.get("geometry")

        if geom is None:
            continue

        geom["coordinates"] = simplify_coords(
            geom["coordinates"],
            keep_percent
        )

    return out


def main():

    parser = argparse.ArgumentParser(
        description="Reduce GeoJSON point density."
    )

    parser.add_argument(
        "input",
        help="Input GeoJSON"
    )

    parser.add_argument(
        "output",
        help="Output GeoJSON"
    )

    parser.add_argument(
        "--keep",
        type=float,
        default=0.25,
        help="Fraction of points to keep (0.0-1.0). Example: 0.25 keeps 25%%."
    )

    args = parser.parse_args()

    if not (0 < args.keep <= 1):
        raise ValueError("--keep must be between 0 and 1")

    with open(args.input, "r", encoding="utf-8") as f:
        data = json.load(f)

    simplified = simplify_geojson(data, args.keep)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(simplified, f, separators=(",", ":"))

    print(f"Done. Wrote {args.output}")


if __name__ == "__main__":
    main()