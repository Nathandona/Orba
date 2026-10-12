"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = boolean | string;

export interface MatrixRow {
  label: string;
  values: [Cell, Cell];
  hint?: string;
}

export interface MatrixGroup {
  title: string;
  rows: MatrixRow[];
}

interface PricingMatrixProps {
  plans: [string, string];
  groups: MatrixGroup[];
  className?: string;
}

function renderCell(value: Cell) {
  if (value === true) return <Check aria-label="Included" className="mx-auto h-4 w-4 text-ink-1" />;
  if (value === false) return <Minus aria-label="Not included" className="mx-auto h-4 w-4 text-ink-3/50" />;
  return <span className="font-mono text-xs text-ink-1">{value}</span>;
}

/* Two plans fit at 360px, so this is a plain table with no horizontal scroll. */
export function PricingMatrix({ plans, groups, className }: PricingMatrixProps) {
  return (
    <table className={cn("w-full table-fixed border-collapse text-left", className)}>
      <thead>
        <tr>
          <th className="w-[46%] pb-4 text-sm font-medium text-ink-1 sm:w-1/2">
            <span className="sr-only">Feature</span>
          </th>
          {plans.map((p) => (
            <th key={p} className="pb-4 text-center text-sm font-medium text-ink-1">
              {p}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <React.Fragment key={group.title}>
            <tr>
              <th colSpan={3} scope="colgroup" className="border-t border-hairline pt-8 pb-3 text-sm font-medium text-ink-2">
                {group.title}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="border-t border-hairline">
                <th scope="row" className="py-3.5 pr-3 align-top text-sm font-normal text-ink-1">
                  {row.label}
                  {row.hint && <div className="mt-1 text-xs text-ink-3">{row.hint}</div>}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className="py-3.5 text-center align-top">
                    {renderCell(v)}
                  </td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
