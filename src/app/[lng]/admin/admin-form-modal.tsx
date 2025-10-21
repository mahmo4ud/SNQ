"use client";
import { FormEvent, useRef } from "react";
import { XMarkIcon, TrashIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface FormField {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "file";
  direction?: "rtl" | "ltr";
  placeholder?: string;
  rows?: number;
  required?: boolean;
  accept?: string;
  onFileChange?: (file: File) => void;
  uploadText?: string;
  uploadSubText?: string;
  uploading?: boolean;
}

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  title: string;
  fields: FormField[];
  submitText: string;
  cancelText: string;
  direction: "rtl" | "ltr";
}

function FileUploadField({ field }: { field: FormField }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (!field.uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && field.onFileChange) {
            field.onFileChange(file);
          }
        }}
        accept={field.accept ?? "image/*"}
        required={field.required ?? true}
        className="hidden"
      />
      {!field.value ? (
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer flex flex-col items-center gap-3"
        >
          <ArrowUpTrayIcon className="w-12 h-12 text-gray-400" />
          <span className="text-gray-600 font-medium">{field.uploadText}</span>
          <span className="text-gray-400 text-sm">{field.uploadSubText}</span>
        </button>
      ) : (
        <div className="relative inline-block">
          <img
            src={field.value}
            alt="Preview"
            className="max-w-xs max-h-40 rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={() => {
              field.onChange("");
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg cursor-pointer"
            aria-label="Delete image"
          >
            <TrashIcon className="md:w-5 md:h-5 w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminFormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  submitText,
  cancelText,
  direction,
}: AdminFormModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-80 p-4"
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6" dir={direction}>
            <h2 className="text-2xl font-bold text-primary">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} dir={direction}>
                <label className="block font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required={field.required ?? true}
                    rows={6}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    dir={field.direction}
                  />
                ) : field.type === "file" ? (
                  <FileUploadField field={field} />
                ) : (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required={field.required ?? true}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    dir={field.direction}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-4 pt-4 text-white font-medium" dir={direction}>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-2 cursor-pointer rounded-lg bg-gold hover:bg-gold/90 transition-all duration-300"
              >
                {cancelText}
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-2 cursor-pointer bg-primary rounded-lg hover:bg-primary/90 transition-all duration-300"
              >
                {submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
