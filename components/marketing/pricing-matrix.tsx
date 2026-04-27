"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = boolean | string;

export interface MatrixRow {
  label: string;
  values: [Cell, Cell, Cell];
  hint?: string;
}

export interface MatrixGroup {
  title: string;
  rows: MatrixRow[];
}

interface PricingMatrixProps {
  plans: [string, string, string];
  groups: MatrixGroup[];
  featuredIndex?: 0 | 1 | 2;
  className?: string;
}

function renderCell(value: Cell) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-brand" />;
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-ink-3/40" />;
  return <span className="text-sm text-ink-1">{value}</span>;
}

export function PricingMatrix({
  plans,
  groups,
  featuredIndex = 1,
  className,
}: PricingMatrixProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-1/3 bg-background py-5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-3">
              Compare plans
            </th>
            {plans.map((p, i) => (
              <th
                key={p}
                className={cn(
                  "w-[22%] py-5 text-center text-sm font-medium",
                  i === featuredIndex ? "text-brand" : "text-ink-2",
                )}
              >
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <React.Fragment key={group.title}>
              <tr>
                <td
                  colSpan={4}
                  className="border-t border-hairline pt-8 pb-3 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-3"
                >
                  {group.title}
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-t border-hairline/60">
                  <td className="sticky left-0 z-10 bg-background py-4 pr-4 align-top text-sm text-ink-1">
                    {row.label}
                    {row.hint && (
                      <div className="mt-1 text-xs text-ink-3">{row.hint}</div>
                    )}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={cn(
                        "py-4 text-center align-top",
                        i === featuredIndex && "bg-brand-tint/40",
                      )}
                    >
                      {renderCell(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
