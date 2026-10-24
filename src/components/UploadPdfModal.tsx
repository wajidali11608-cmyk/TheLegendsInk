import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, RotateCcw, ArrowUpRight, AlertCircle } from 'lucide-react';
import { savePdfToStorage, clearStoredPdf, StoredPdfMetadata } from '../utils/pdfStorage';

interface UploadPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPdfUploaded: (blobUrl: string, meta: StoredPdfMetadata) => void;
  onResetToDefault: () => void;
  isCustomActive: boolean;
  currentMeta?: StoredPdfMetadata | null;
}

export const UploadPdfModal: React.FC<UploadPdfModalProps> = ({
  isOpen,
  onClose,
  onPdfUploaded,
  onResetToDefault,
  isCustomActive,
  currentMeta,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [issueTitle, setIssueTitle] = useState('The Legends Ink — Current Edition');
  const [issueLabel, setIssueLabel] = useState('October 2026');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setErrorMsg(null);
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document (.pdf file).');
      return;
    }
    setSelectedFile(file);
    // Auto-generate title if default
    const cleanName = file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
    setIssueTitle(cleanName);
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    try {
      setIsProcessing(true);
      const meta = {
        title: issueTitle.trim() || selectedFile.name,
        issue: issueLabel.trim() || 'Latest Edition',
      };
      const blobUrl = await savePdfToStorage(selectedFile, meta);
      onPdfUploaded(blobUrl, {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        uploadedAt: new Date().toISOString(),
        title: meta.title,
        issue: meta.issue,
      });
      setIsProcessing(false);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to store the PDF in browser memory. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleReset = async () => {
    await clearStoredPdf();
    onResetToDefault();
    setSelectedFile(null);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0F1012] border border-[#C59E3F]/40 shadow-2xl overflow-hidden relative text-[#FBF9F5] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-white/10 flex items-center justify-between bg-[#15161A]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#C59E3F]/15 border border-[#C59E3F]/40 text-[#C59E3F]">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C59E3F] font-bold">
                MAGAZINE ARCHIVE SUITE
              </div>
              <h2 className="font-headline font-bold text-lg md:text-xl uppercase tracking-wider text-white">
                Upload & Share Magazine PDF
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-white/20 hover:border-[#C59E3F] hover:text-[#C59E3F] transition-colors text-white/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Status Banner */}
          <div className="p-3.5 bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-white/50 uppercase tracking-wider text-[10px] block">Current Publication</span>
              <span className="text-white font-bold tracking-wide">
                {isCustomActive && currentMeta
                  ? currentMeta.title
                  : 'The Legends Ink — October 2026 (Default 68 Pages)'}
              </span>
            </div>

            {isCustomActive && (
              <button
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-[10px] uppercase tracking-wider text-[#C59E3F] hover:text-white px-2.5 py-1 border border-[#C59E3F]/30 hover:border-white transition-colors"
                title="Restore default October 2026 issue"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Default</span>
              </button>
            )}
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
              dragActive
                ? 'border-[#C59E3F] bg-[#C59E3F]/10 scale-[0.99]'
                : selectedFile
                ? 'border-emerald-500/60 bg-emerald-950/15'
                : 'border-white/20 hover:border-[#C59E3F]/60 bg-white/[0.02]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <div className="text-sm font-bold text-white tracking-wide">
                  {selectedFile.name}
                </div>
                <div className="text-xs font-mono text-emerald-400">
                  {formatFileSize(selectedFile.size)} • PDF Ready for Reading
                </div>
                <span className="text-[10px] text-white/50 uppercase tracking-widest pt-1">
                  Click or drag another file to replace
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <FileText className="w-10 h-10 text-white/40 group-hover:text-[#C59E3F]" />
                <div>
                  <div className="text-sm font-semibold text-white tracking-wide">
                    Drag and drop your complete magazine PDF here
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    or browse files from your computer
                  </div>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/70">
                  <span>Supports any size PDF • Instant live reading</span>
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Issue Information Fields */}
          {selectedFile && (
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Magazine Title / Issue Header
                </label>
                <input
                  type="text"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  placeholder="e.g. The Legends Ink — Special Edition"
                  className="w-full p-2.5 bg-black border border-white/20 text-xs font-sans text-white focus:outline-none focus:border-[#C59E3F]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Issue Month / Year (Optional)
                </label>
                <input
                  type="text"
                  value={issueLabel}
                  onChange={(e) => setIssueLabel(e.target.value)}
                  placeholder="e.g. November 2026 • Vol 01 Issue 04"
                  className="w-full p-2.5 bg-black border border-white/20 text-xs font-sans text-white focus:outline-none focus:border-[#C59E3F]"
                />
              </div>
            </div>
          )}

          {/* Information Notice */}
          <div className="text-[11px] font-sans text-white/60 leading-relaxed bg-[#C59E3F]/5 border border-[#C59E3F]/20 p-3">
            <strong className="text-[#C59E3F] uppercase tracking-wider block mb-0.5">
              Instant Reader & Sharing:
            </strong>
            Uploaded magazines are saved locally to your device’s storage so anyone browsing can read the full pages with built-in zoom, search, full-spread view, and PDF download.
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 border-t border-white/10 bg-[#15161A] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/20 text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!selectedFile || isProcessing}
            className={`px-6 py-2.5 bg-[#C59E3F] text-[#0F1012] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-all shadow-md ${
              !selectedFile || isProcessing
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-[#DFBD69] hover:shadow-[0_0_20px_rgba(197,158,63,0.3)]'
            }`}
          >
            <span>{isProcessing ? 'Processing PDF...' : 'Open in Magazine Reader'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
};
