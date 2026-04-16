"use client";

import { useTranslations } from "next-intl";
import { Paperclip, X } from "lucide-react";
import { UploadValue } from "./types";

const MAX_SIZE_MB = 10;
const ACCEPT = ".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv";

interface Props {
  value: UploadValue;
  onChange: (v: UploadValue) => void;
  selectedFile: File | null;
  onChooseFile: () => void;
  onClearFile: () => void;
}

export function StepUpload({
  value,
  onChange,
  selectedFile,
  onChooseFile,
  onClearFile,
}: Props) {
  const t = useTranslations("SchedulingWidget");

  const sizeError =
    selectedFile && selectedFile.size > MAX_SIZE_MB * 1024 * 1024;
  const typeError =
    selectedFile &&
    !ACCEPT.split(",").some((ext) =>
      selectedFile.name.toLowerCase().endsWith(ext)
    );

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepUpload.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">{t("stepUpload.description")}</p>

      {/* File chooser */}
      {selectedFile ? (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
          <Paperclip className="h-3.5 w-3.5 shrink-0 text-stone-400" />
          <span className="flex-1 truncate text-xs text-stone-700">
            {selectedFile.name}
          </span>
          <button
            type="button"
            onClick={onClearFile}
            className="p-0.5 text-stone-300 hover:text-red-400 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onChooseFile}
          className="mb-3 flex items-center gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-xs font-medium text-stone-500 transition-colors hover:border-stone-400 hover:bg-stone-100"
        >
          <Paperclip className="h-3.5 w-3.5" />
          {t("stepUpload.chooseFile")}
        </button>
      )}

      {sizeError && (
        <p className="mb-2 text-xs text-red-500">
          {t("stepUpload.sizeError", { max: MAX_SIZE_MB })}
        </p>
      )}
      {typeError && (
        <p className="mb-2 text-xs text-red-500">{t("stepUpload.typeError")}</p>
      )}

      {/* Comment */}
      <label className="mb-1 block text-xs font-medium text-stone-600">
        {t("stepUpload.commentLabel")}
      </label>
      <textarea
        value={value.comment}
        onChange={(e) => onChange({ ...value, comment: e.target.value })}
        placeholder={t("stepUpload.commentPlaceholder")}
        rows={3}
        className="w-full resize-none rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
      />

    </div>
  );
}
