/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LucideIcon } from "lucide-react";

interface MetadataFieldProps {
  label: string;
  value: string | number | string[] | undefined;
  standard?: string;
  key?: React.Key;
}

const MetadataField = ({ label, value, standard }: MetadataFieldProps) => {
  if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <tr className="border-b border-omeka-border group hover:bg-white transition-colors">
      <td className="py-2.5 px-4 w-1/3 align-top bg-zinc-50/50 group-hover:bg-white border-r border-omeka-border">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-zinc-600 leading-tight">{label}</span>
          {standard && (
            <span className="text-[8px] font-black text-white bg-zinc-400 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter w-fit">
              {standard}
            </span>
          )}
        </div>
      </td>
      <td className="py-2.5 px-4 text-sm text-zinc-900 leading-relaxed font-medium">
        {Array.isArray(value) ? (
          <ul className="list-disc list-inside space-y-1">
            {value.map((v, i) => (
              <li key={i} className="text-sm">{v}</li>
            ))}
          </ul>
        ) : (
          <p className="whitespace-pre-wrap">{value}</p>
        )}
      </td>
    </tr>
  );
};

interface MetadataSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function MetadataSection({ title, icon: Icon, children }: MetadataSectionProps) {
  return (
    <div className="bg-white border border-omeka-border rounded-sm shadow-sm overflow-hidden mb-6">
      <div className="section-header">
        <Icon size={12} className="text-zinc-500" />
        {title}
      </div>
      <table className="w-full text-left border-collapse">
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export { MetadataField };
