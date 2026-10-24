import React, { useState, useEffect } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  BookOpen,
  Download,
  Share2,
  ExternalLink,
  Upload,
  Check,
} from 'lucide-react';
import { MAGAZINE_DETAILS } from '../data/magazineContent';

interface MagazinePdfReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  pdfTitle?: string;
  pdfIssue?: string;
  coverImage?: string;
  onOpenUpload?: () => void;
  onOpenArticle?: (slug: string) => void;
}

export const MagazinePdfReaderModal: React.FC<MagazinePdfReaderModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  pdfTitle = 'The Legends Ink — October 2026 Issue',
  pdfIssue = 'VOL. 01 • ISSUE 03 • OCTOBER 2026 • 68 PAGES',
  onOpenUpload,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pdfTitle,
        text: `Read the complete issue of ${MAGAZINE_DETAILS.name} online for free.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#07080A] text-[#F7F5F0] overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* Top Master Reader Bar */}
      <header className="h-14 sm:h-16 bg-[#0B0D11] border-b border-white/10 px-3 sm:px-6 flex items-center justify-between z-30 flex-shrink-0">
        
        {/* Left: Magazine identity & Title */}
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="p-1.5 sm:p-2 bg-[#C59E3F]/15 border border-[#C59E3F]/40 text-[#C59E3F] rounded-[2px] flex-shrink-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="min-w-0">
            <h2 className="font-headline font-bold text-xs sm:text-sm uppercase tracking-wider text-white truncate">
              {pdfTitle}
            </h2>
            <div className="flex items-center space-x-2 text-[9px] sm:text-[10px] font-mono text-white/60 truncate">
              <span className="text-[#C59E3F] font-bold">DIGITAL EDITION</span>
              <span>•</span>
              <span className="truncate">{pdfIssue}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions (Download, Upload, Share, Popout, Fullscreen, Close) */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* Download PDF button */}
          <a
            href={pdfUrl}
            download={pdfTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '.pdf'}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-[#C59E3F] hover:bg-[#DFBD69] text-[#0F1012] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 sm:space-x-1.5 font-sans"
            title="Download full PDF to your device"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>

          {/* Upload New Issue / CMS Studio */}
          {onOpenUpload && (
            <button
              onClick={onOpenUpload}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 sm:space-x-1.5 border border-white/20"
              title="Upload New Issue / Open Editorial CMS"
            >
              <Upload className="w-3.5 h-3.5 text-[#C59E3F]" />
              <span className="hidden md:inline">Editorial Studio</span>
            </button>
          )}

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-1.5 sm:p-2 border border-white/15 hover:bg-white/10 text-white/80 transition-colors"
            title="Share magazine link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Open in new window */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 border border-white/15 hover:bg-white/10 text-white/80 transition-colors hidden sm:flex"
            title="Open PDF directly in new browser tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 border border-white/15 hover:bg-white/10 text-white/80 transition-colors hidden sm:flex"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close modal */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 border border-white/20 hover:border-[#C59E3F] hover:bg-white/10 text-white transition-colors"
            title="Close Reader (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </header>

      {/* Main Body Canvas */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-[#12141A]">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&statusbar=1&view=FitH`}
          title="Full Magazine PDF Document Reader"
          className="w-full h-full border-0 bg-[#1E2026]"
        />
      </div>

    </div>
  );
};
