"use client";

import { useTranslations } from "next-intl";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function NoteField({ value, onChange }: Props) {
  const t = useTranslations("SchedulingWidget");

  return (
    <div className="mt-3">
      <label className="mb-1 block text-xs font-medium text-stone-500">
        {t("note.noteLabel")}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("note.notePlaceholder")}
        rows={2}
        className="w-full resize-none rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
      />
    </div>
  );
}
