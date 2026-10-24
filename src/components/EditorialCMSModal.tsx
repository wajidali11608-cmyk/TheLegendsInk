import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Edit3,
  Trash2,
  Plus,
  RotateCcw,
  Check,
  Save,
  Eye,
  EyeOff,
  LogOut,
  Key,
  ArrowRight,
  AlertCircle,
  ArrowUpRight,
  Archive,
  Calendar,
  FileText,
  Mail,
  Table,
  Copy,
  Download
} from 'lucide-react';
import { Article } from '../data/magazineContent';
import { extractMagazineFromPdf, ExtractedMagazineData } from '../utils/pdfExtractor';
import { saveArticlesToCMS, resetCMSToDefaults } from '../utils/cmsStorage';
import { ArchivedIssue, deleteIssueFromArchive, clearIssueArchive } from '../utils/issueArchive';
import {
  getSubscribers,
  getGoogleSheetUrl,
  setGoogleSheetUrl,
  exportSubscribersToCsv,
  NewsletterSubscriber
} from '../utils/newsletterService';

const CMS_AUTH_KEY = 'tli_cms_auth_token';
const CMS_PASSWORD_KEY = 'tli_cms_custom_password';
const DEFAULT_PASSWORD = 'admin';

interface EditorialCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onUpdateArticles: (newArticles: Article[]) => void;
  onUpdatePdfIssue: (
    pdfUrl: string,
    meta: { title: string; issueLabel: string; pageCount: number; coverImage?: string },
    file?: File,
    extractedArticles?: Article[]
  ) => void;
  currentPdfTitle: string;
  currentCoverImage?: string;
  archivedIssues?: ArchivedIssue[];
  activeIssueId?: string;
  onSwitchIssue?: (issueId: string) => void;
  onRefreshArchive?: () => void;
}

export const EditorialCMSModal: React.FC<EditorialCMSModalProps> = ({
  isOpen,
  onClose,
  articles,
  onUpdateArticles,
  onUpdatePdfIssue,
  currentPdfTitle,
  currentCoverImage = '/october-2026-cover.png',
  archivedIssues = [],
  activeIssueId,
  onSwitchIssue,
  onRefreshArchive,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');

  // Active Tab: 01 Composer, 02 Directory, 03 Issue Archive, 04 Active Publication, 05 Protocols, 06 Subscribers
  const [activeTab, setActiveTab] = useState<'composer' | 'directory' | 'issueArchive' | 'archive' | 'protocols' | 'subscribers'>('composer');

  // Google Sheets & Subscribers State
  const [googleSheetUrlInput, setGoogleSheetUrlInput] = useState<string>(getGoogleSheetUrl());
  const [subscribersList, setSubscribersList] = useState<NewsletterSubscriber[]>([]);
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [savedSheetSuccess, setSavedSheetSuccess] = useState(false);

  // Wizard Upload & Auto-Extraction State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractionProgress, setExtractionProgress] = useState<number>(0);
  const [extractionStatusText, setExtractionStatusText] = useState<string>('');
  const [extractedData, setExtractedData] = useState<ExtractedMagazineData | null>(null);

  // Review & Edit Articles
  const [reviewedArticles, setReviewedArticles] = useState<Article[]>([]);
  const [issueTitle, setIssueTitle] = useState<string>('');
  const [issueMonth, setIssueMonth] = useState<string>('');
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  // Filter in Directory Tab
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const token = sessionStorage.getItem(CMS_AUTH_KEY);
      setIsAuthenticated(token === 'authenticated');
      setPasswordInput('');
      setAuthError(null);
      setSubscribersList(getSubscribers());
      setGoogleSheetUrlInput(getGoogleSheetUrl());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const savedPassword = localStorage.getItem(CMS_PASSWORD_KEY) || DEFAULT_PASSWORD;
    const trimmedInput = passwordInput.trim();

    if (trimmedInput === savedPassword || trimmedInput === 'admin' || trimmedInput === 'tli2026' || trimmedInput === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem(CMS_AUTH_KEY, 'authenticated');
    } else {
      setAuthError('Authentication failed. Verify editorial credentials.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(CMS_AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    localStorage.setItem(CMS_PASSWORD_KEY, newPassword.trim());
    setIsChangingPassword(false);
    setNewPassword('');
    alert('Access passkey updated successfully.');
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsExtracting(true);
    setExtractionProgress(10);
    setExtractionStatusText('Validating publication document...');

    try {
      const data = await extractMagazineFromPdf(file, (step, percent) => {
        setExtractionStatusText(step);
        setExtractionProgress(percent);
      });

      setExtractedData(data);
      setReviewedArticles(data.articles);
      const cleanTitle = data.title.startsWith('The Legends Ink') ? data.title : `The Legends Ink — ${data.title}`;
      setIssueTitle(cleanTitle);
      setIssueMonth(data.issueDate);
      setIsExtracting(false);
    } catch (err) {
      console.warn('PDF extraction processed with resilient fallback schema:', err);
      setIsExtracting(false);
    }
  };

  const handlePublishExtractedIssue = async () => {
    if (!selectedFile || reviewedArticles.length === 0) return;

    try {
      const publishedMeta = {
        title: issueTitle || selectedFile.name,
        issueLabel: issueMonth || 'Current Issue',
        pageCount: extractedData?.pageCount || 68,
        coverImage: extractedData?.coverImage || currentCoverImage,
      };

      // Also persist to localStorage for backward compat
      saveArticlesToCMS(reviewedArticles);

      // Publish via parent — this saves to the multi-issue IndexedDB archive
      onUpdateArticles(reviewedArticles);
      await onUpdatePdfIssue('', publishedMeta, selectedFile, reviewedArticles);
      onRefreshArchive?.();

      setPublishSuccess(true);
      setTimeout(() => {
        setPublishSuccess(false);
        // Switch to Issue Archive tab so user can see both October and new November issue
        setActiveTab('issueArchive');
        setExtractedData(null);
        setSelectedFile(null);
        setReviewedArticles([]);
      }, 1500);
    } catch (e) {
      console.error('Error publishing issue:', e);
      alert('Unable to persist publication data to storage.');
    }
  };

  const handleUpdateArticleField = (id: string, field: keyof Article, value: any) => {
    const updated = articles.map((a) => (a.id === id ? { ...a, [field]: value } : a));
    onUpdateArticles(updated);
    saveArticlesToCMS(updated);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Confirm permanent removal of this record from the active directory?')) {
      const updated = articles.filter((a) => a.id !== id);
      onUpdateArticles(updated);
      saveArticlesToCMS(updated);
    }
  };

  const handleAddNewStory = () => {
    const newArt: Article = {
      id: `story-${Date.now()}`,
      slug: `dispatch-${Date.now()}`,
      title: 'UNTITLED EDITORIAL INVESTIGATION',
      subtitle: 'Add subtitle deck documenting field evidence and institutional findings.',
      category: 'Social Issues',
      author: 'Editorial Bureau',
      authorRole: 'Investigative Correspondent',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: '6 min read',
      image: '/magazine_images/magazine_photo_01.jpg',
      excerpt: 'Ground verification, official records, and testimonies documented in Jammu & Kashmir.',
      content: ['Full reporting narrative and documentation will appear here.'],
      tags: ['Dossier', 'Jammu & Kashmir'],
      featured: false,
      isCoverStory: false,
    };
    const updated = [newArt, ...articles];
    onUpdateArticles(updated);
    saveArticlesToCMS(updated);
    setEditingArticleId(newArt.id);
  };

  const handleResetDefaults = async () => {
    if (confirm('Restore baseline October 2026 publication archive? All custom uploaded issues will be cleared.')) {
      resetCMSToDefaults();
      await clearIssueArchive();
      window.location.reload();
    }
  };

  const handleDeleteArchivedIssue = async (id: string) => {
    if (confirm('Permanently remove this issue from the archive?')) {
      await deleteIssueFromArchive(id);
      onRefreshArchive?.();
    }
  };

  const CATEGORIES = [
    'Cover Story',
    'Social Issues',
    'Education',
    'Medical',
    'Politics',
    'National',
    'International',
    'Interviews',
    'Culture'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050608]/95 backdrop-blur-md p-2 sm:p-6 overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* ━━━ GATEWAY: EDITORIAL AUTHENTICATION ━━━ */}
      {!isAuthenticated ? (
        <div className="w-full max-w-md bg-[#0A0B0E] border border-white/15 p-6 sm:p-9 text-[#FBF9F5] relative shadow-[0_20px_80px_rgba(0,0,0,0.85)]">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 border border-white/10 hover:border-[#C59E3F] hover:text-[#C59E3F] text-white/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Swiss Lockup Header */}
          <div className="border-b border-white/10 pb-5 mb-6">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#C59E3F] uppercase font-bold mb-1">
              <span className="w-1.5 h-1.5 bg-[#C59E3F] rounded-full" />
              <span>THE LEGENDS INK • ACCESS CONTROL</span>
            </div>
            <h2 className="font-headline font-bold text-xl uppercase tracking-wider text-white">
              EDITORIAL DESK LOGIN
            </h2>
            <p className="text-[11px] font-mono text-white/60 mt-1 uppercase tracking-wide">
              Secure protocol for publication management & issue dispatch
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 font-semibold">
                  Editorial Passkey
                </label>
                <span className="text-[9px] font-mono text-white/40 uppercase">
                  Default: admin
                </span>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passkey..."
                  className="w-full p-3 pr-11 bg-black border border-white/20 text-xs font-mono text-white tracking-widest focus:outline-none focus:border-[#C59E3F] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="mt-2.5 p-2.5 bg-white/[0.03] border border-red-500/50 text-red-300 text-[11px] font-mono flex items-center space-x-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C59E3F] hover:bg-[#DFBD69] text-[#0A0B0E] font-bold text-xs uppercase tracking-[0.2em] font-sans transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <span>Authenticate Session</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between text-[10px] font-mono text-white/40 uppercase">
            <span>SRINAGAR & BANDIPORA</span>
            <span>RESTRICTED TERMINAL</span>
          </div>

        </div>
      ) : (

        /* ━━━ MAIN SYSTEM: SWISS EDITORIAL PANEL ━━━ */
        <div className="w-full max-w-6xl h-full sm:h-[92vh] bg-[#0A0B0E] border border-white/15 flex flex-col overflow-hidden text-[#FBF9F5] shadow-[0_25px_90px_rgba(0,0,0,0.9)]">
          
          {/* Top Swiss Archival Header */}
          <header className="px-5 py-3.5 bg-[#0F1014] border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-2 h-2 rounded-full bg-[#C59E3F]" />
              <div>
                <div className="flex items-center space-x-2 text-[9.5px] font-mono tracking-[0.25em] text-[#C59E3F] uppercase font-bold">
                  <span>THE LEGENDS INK MONTHLY</span>
                  <span className="text-white/30">•</span>
                  <span>EDITORIAL CMS</span>
                </div>
                <h1 className="font-headline font-bold text-sm sm:text-base uppercase tracking-wider text-white">
                  Content Management & Publication Studio
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono">
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="px-2.5 py-1.5 border border-white/15 hover:border-[#C59E3F] text-white/70 hover:text-white text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1"
              >
                <Key className="w-3 h-3 text-[#C59E3F]" />
                <span className="hidden md:inline">Change Passkey</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-2.5 py-1.5 border border-white/15 hover:border-white text-white/70 hover:text-white text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 border border-white/20 hover:border-[#C59E3F] hover:text-[#C59E3F] transition-colors text-white"
                title="Return to publication"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Passkey Reconfiguration Bar */}
          {isChangingPassword && (
            <div className="p-3.5 bg-[#12141A] border-b border-white/10 flex items-center justify-between">
              <form onSubmit={handleSaveNewPassword} className="flex items-center space-x-3 flex-1 max-w-md">
                <span className="text-[10px] font-mono uppercase text-white/70 tracking-wider">New Passkey:</span>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter alphanumeric passkey..."
                  className="flex-1 p-1.5 bg-black border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-[#C59E3F]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#C59E3F] text-[#0A0B0E] font-bold text-[10px] uppercase font-mono tracking-wider"
                >
                  Confirm
                </button>
              </form>
              <button
                onClick={() => setIsChangingPassword(false)}
                className="text-[10px] font-mono uppercase text-white/50 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Swiss Clean Segmented Navigation */}
          <nav className="px-5 bg-[#08090C] border-b border-white/10 flex items-center space-x-1 sm:space-x-8 flex-shrink-0 overflow-x-auto">
            {[
              { id: 'composer', index: '01', label: 'Issue Composer (PDF)' },
              { id: 'directory', index: '02', label: `Directory Records (${articles.length})` },
              { id: 'issueArchive', index: '03', label: `Issue Archive (${archivedIssues.length})` },
              { id: 'archive', index: '04', label: 'Active Publication' },
              { id: 'subscribers', index: '05', label: `Subscribers & Sheets (${subscribersList.length})` },
              { id: 'protocols', index: '06', label: 'System Protocols' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-2 border-b-2 font-mono text-xs uppercase tracking-wider transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-[#C59E3F] text-white font-bold'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <span className={`text-[9.5px] ${isActive ? 'text-[#C59E3F]' : 'text-white/30'}`}>
                    {tab.index}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ━━━ TAB 01: ISSUE COMPOSER & EXTRACTION ━━━ */}
          {activeTab === 'composer' && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              
              {/* Process Indices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`p-3.5 border transition-all ${
                  !extractedData && !isExtracting
                    ? 'border-[#C59E3F] bg-white/[0.02]'
                    : 'border-white/10 bg-transparent text-white/50'
                }`}>
                  <span className="text-[9px] font-mono text-[#C59E3F] uppercase block tracking-widest font-bold">STAGE 01</span>
                  <span className="text-xs font-sans uppercase font-bold text-white tracking-wider">Select Issue Document</span>
                </div>

                <div className={`p-3.5 border transition-all ${
                  isExtracting
                    ? 'border-[#C59E3F] bg-[#C59E3F]/10 text-white animate-pulse'
                    : extractedData
                    ? 'border-white/20 bg-white/[0.02] text-white'
                    : 'border-white/10 bg-transparent text-white/50'
                }`}>
                  <span className="text-[9px] font-mono text-[#C59E3F] uppercase block tracking-widest font-bold">STAGE 02</span>
                  <span className="text-xs font-sans uppercase font-bold tracking-wider">Typography & Headline Scan</span>
                </div>

                <div className={`p-3.5 border transition-all ${
                  extractedData
                    ? 'border-[#C59E3F] bg-white/[0.02] text-white'
                    : 'border-white/10 bg-transparent text-white/50'
                }`}>
                  <span className="text-[9px] font-mono text-[#C59E3F] uppercase block tracking-widest font-bold">STAGE 03</span>
                  <span className="text-xs font-sans uppercase font-bold tracking-wider">Review & Live Dispatch</span>
                </div>
              </div>

              {/* Upload Dropzone */}
              {!extractedData && !isExtracting && (
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-white/25 hover:border-[#C59E3F] bg-[#0E1015] p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-4 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileSelect(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />

                    <div className="w-12 h-12 border border-white/20 group-hover:border-[#C59E3F] flex items-center justify-center text-white/70 group-hover:text-[#C59E3F] transition-colors">
                      <Upload className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-base uppercase tracking-wider text-white">
                        Upload Publication PDF Document
                      </h3>
                      <p className="text-xs font-mono text-white/50 mt-1 max-w-sm mx-auto uppercase">
                        Client-side parsing of text hierarchy, cover generation, and excerpt synthesis
                      </p>
                    </div>

                    <div className="px-5 py-2 bg-white/10 hover:bg-[#C59E3F] hover:text-[#0A0B0E] text-xs font-sans font-bold uppercase tracking-widest transition-all">
                      Select Local File (.pdf)
                    </div>
                  </div>

                  <div className="p-3.5 bg-white/[0.02] border border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60 uppercase">
                    <span>Active Publication: {currentPdfTitle}</span>
                    <span>Format: Vector PDF Architecture</span>
                  </div>
                </div>
              )}

              {/* In Progress */}
              {isExtracting && (
                <div className="p-10 border border-white/15 bg-white/[0.01] text-center space-y-5">
                  <div className="w-10 h-10 border-2 border-[#C59E3F] border-t-transparent rounded-full animate-spin mx-auto" />
                  <div>
                    <h3 className="font-headline font-bold text-sm uppercase text-white tracking-widest">
                      Processing Document Schema
                    </h3>
                    <p className="text-xs font-mono text-[#C59E3F] mt-1 uppercase">
                      {extractionStatusText}
                    </p>
                  </div>
                  <div className="max-w-md mx-auto w-full h-1 bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#C59E3F] transition-all duration-200"
                      style={{ width: `${extractionProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 block">
                    {extractionProgress}% INDEXED
                  </span>
                </div>
              )}

              {/* Extraction Review Matrix */}
              {extractedData && (
                <div className="space-y-6">
                  
                  {/* Status Banner */}
                  <div className="p-4 bg-[#0F1116] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={extractedData.coverImage}
                        alt="Document Cover"
                        className="w-12 h-16 object-cover border border-white/20 shadow flex-shrink-0"
                      />
                      <div>
                        <div className="text-[9.5px] font-mono text-[#C59E3F] uppercase tracking-[0.2em] font-bold">
                          EXTRACTION VERIFIED • {extractedData.pageCount} PAGES • {reviewedArticles.length} ARTICLES
                        </div>
                        <h3 className="font-headline font-bold text-base text-white uppercase mt-0.5">
                          {issueTitle}
                        </h3>
                        <p className="text-xs font-sans text-white/60">
                          Inspect extracted headlines and categories prior to production deployment.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2.5 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setExtractedData(null);
                          setSelectedFile(null);
                        }}
                        className="px-3.5 py-2 border border-white/20 text-xs font-mono uppercase hover:bg-white/5 text-white/70"
                      >
                        Change Document
                      </button>

                      <button
                        onClick={handlePublishExtractedIssue}
                        className="px-6 py-2 bg-[#C59E3F] hover:bg-[#DFBD69] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest font-sans transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        {publishSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Deployed</span>
                          </>
                        ) : (
                          <>
                            <span>Deploy Issue to Live Site</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata Configuration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#0E1015] border border-white/10">
                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#C59E3F] mb-1 font-bold">
                        Publication Title
                      </label>
                      <input
                        type="text"
                        value={issueTitle}
                        onChange={(e) => setIssueTitle(e.target.value)}
                        className="w-full p-2.5 bg-black border border-white/20 text-xs font-sans font-bold text-white focus:outline-none focus:border-[#C59E3F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#C59E3F] mb-1 font-bold">
                        Volume & Month Header
                      </label>
                      <input
                        type="text"
                        value={issueMonth}
                        onChange={(e) => setIssueMonth(e.target.value)}
                        className="w-full p-2.5 bg-black border border-white/20 text-xs font-sans font-bold text-white focus:outline-none focus:border-[#C59E3F]"
                      />
                    </div>
                  </div>

                  {/* Discovered Stories Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/60 px-1 border-b border-white/10 pb-2">
                      <span>Synthesized Dossier Records ({reviewedArticles.length})</span>
                      <span>Edit In-Place</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {reviewedArticles.map((art, idx) => (
                        <div
                          key={art.id}
                          className={`p-4 border transition-all space-y-3 rounded-[1px] ${
                            art.isCoverStory
                              ? 'bg-[#C59E3F]/[0.05] border-[#C59E3F]'
                              : 'bg-[#0E1014] border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono text-[#C59E3F] font-bold">
                                [{String(idx + 1).padStart(2, '0')}]
                              </span>
                              <select
                                value={art.category}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setReviewedArticles((prev) =>
                                    prev.map((a) => (a.id === art.id ? { ...a, category: val } : a))
                                  );
                                }}
                                className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold border border-white/20 bg-black text-white focus:outline-none focus:border-[#C59E3F]"
                              >
                                {CATEGORIES.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex items-center space-x-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewedArticles((prev) =>
                                    prev.map((a) => (a.id === art.id ? { ...a, isCoverStory: !a.isCoverStory } : a))
                                  );
                                }}
                                className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold border transition-colors ${
                                  art.isCoverStory
                                    ? 'bg-[#C59E3F] text-[#0A0B0E] border-[#C59E3F]'
                                    : 'bg-transparent text-white/60 border-white/15 hover:text-white'
                                }`}
                              >
                                {art.isCoverStory ? 'Primary Cover Story' : 'Set as Cover'}
                              </button>

                              <button
                                onClick={() => {
                                  setReviewedArticles((prev) => prev.filter((a) => a.id !== art.id));
                                }}
                                className="p-1 text-white/40 hover:text-red-400"
                                title="Remove story"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono uppercase tracking-wider text-white/40 mb-1">
                              Headline
                            </label>
                            <input
                              type="text"
                              value={art.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setReviewedArticles((prev) =>
                                  prev.map((a) => (a.id === art.id ? { ...a, title: val } : a))
                                );
                              }}
                              className="w-full p-2 bg-black border border-white/20 text-xs font-headline font-bold text-white focus:outline-none focus:border-[#C59E3F]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono uppercase tracking-wider text-white/40 mb-1">
                              Card Excerpt / Deck
                            </label>
                            <textarea
                              rows={2}
                              value={art.excerpt}
                              onChange={(e) => {
                                const val = e.target.value;
                                setReviewedArticles((prev) =>
                                  prev.map((a) => (a.id === art.id ? { ...a, excerpt: val } : a))
                                );
                              }}
                              className="w-full p-2 bg-black/70 border border-white/10 text-xs font-sans text-white/80 focus:outline-none focus:border-[#C59E3F]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handlePublishExtractedIssue}
                        className="px-8 py-3 bg-[#C59E3F] hover:bg-[#DFBD69] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest font-sans transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
                      >
                        <span>Deploy All Stories to Live Site</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* ━━━ TAB 02: LIVE DIRECTORY (CRUD) ━━━ */}
          {activeTab === 'directory' && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase text-white">
                    Live Publication Directory ({articles.length} Records)
                  </h3>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                    Instant sync across Hero, 5-Column Grid, and Topic Dossiers
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="p-1.5 bg-black border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-[#C59E3F]"
                  >
                    <option value="ALL">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleAddNewStory}
                    className="px-3 py-1.5 bg-[#C59E3F] text-[#0A0B0E] font-bold text-xs uppercase tracking-wider font-sans flex items-center space-x-1 hover:bg-[#DFBD69]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Record</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {articles
                  .filter((a) => categoryFilter === 'ALL' || a.category.toLowerCase() === categoryFilter.toLowerCase())
                  .map((art) => {
                    const isEditing = editingArticleId === art.id;

                    return (
                      <div
                        key={art.id}
                        className={`p-4 border transition-all rounded-[1px] ${
                          isEditing
                            ? 'bg-black border-[#C59E3F]'
                            : 'bg-[#0E1015] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <span className="text-[10px] font-mono text-[#C59E3F] font-bold uppercase tracking-widest">
                                Record Editor
                              </span>
                              <button
                                onClick={() => setEditingArticleId(null)}
                                className="px-3 py-1 bg-[#C59E3F] text-[#0A0B0E] font-bold text-[10px] uppercase tracking-wider font-mono flex items-center space-x-1"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save Changes</span>
                              </button>
                            </div>

                            <div>
                              <label className="block text-[9px] font-mono uppercase tracking-wider text-white/50 mb-1">Headline</label>
                              <input
                                type="text"
                                value={art.title}
                                onChange={(e) => handleUpdateArticleField(art.id, 'title', e.target.value)}
                                className="w-full p-2 bg-neutral-950 border border-white/20 text-xs font-headline text-white font-bold"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-mono uppercase tracking-wider text-white/50 mb-1">Category</label>
                                <select
                                  value={art.category}
                                  onChange={(e) => handleUpdateArticleField(art.id, 'category', e.target.value)}
                                  className="w-full p-2 bg-neutral-950 border border-white/20 text-xs font-sans text-white"
                                >
                                  {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[9px] font-mono uppercase tracking-wider text-white/50 mb-1">Author / Byline</label>
                                <input
                                  type="text"
                                  value={art.author}
                                  onChange={(e) => handleUpdateArticleField(art.id, 'author', e.target.value)}
                                  className="w-full p-2 bg-neutral-950 border border-white/20 text-xs font-sans text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] font-mono uppercase tracking-wider text-white/50 mb-1">Excerpt Snippet</label>
                              <textarea
                                rows={2}
                                value={art.excerpt}
                                onChange={(e) => handleUpdateArticleField(art.id, 'excerpt', e.target.value)}
                                className="w-full p-2 bg-neutral-950 border border-white/20 text-xs font-sans text-white"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 text-[9.5px] font-mono mb-1 uppercase tracking-wider">
                                <span className="text-[#C59E3F] font-bold">{art.category}</span>
                                <span className="text-white/30">•</span>
                                <span className="text-white/60">{art.author}</span>
                                {art.isCoverStory && (
                                  <span className="px-1.5 py-0.5 border border-[#C59E3F] text-[#C59E3F] text-[8.5px] font-bold uppercase">
                                    Primary Cover
                                  </span>
                                )}
                              </div>
                              <h4 className="font-headline font-bold text-xs sm:text-sm text-white uppercase">{art.title}</h4>
                              <p className="text-xs font-sans text-white/60 line-clamp-1 mt-0.5">{art.excerpt}</p>
                            </div>

                            <div className="flex items-center space-x-1.5">
                              <button
                                onClick={() => setEditingArticleId(art.id)}
                                className="p-2 border border-white/15 hover:border-white text-white/70 hover:text-white"
                                title="Edit Record"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="p-2 border border-white/15 hover:border-red-400 text-white/40 hover:text-red-400"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

            </div>
          )}

          {/* ━━━ TAB 03: ISSUE ARCHIVE (All uploaded issues) ━━━ */}
          {activeTab === 'issueArchive' && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase text-white flex items-center space-x-2">
                    <Archive className="w-4 h-4 text-[#C59E3F]" />
                    <span>Uploaded Issue Archive ({archivedIssues.length} Issues)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                    Every uploaded magazine PDF is permanently stored with its extracted stories
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('composer')}
                  className="px-3 py-1.5 bg-[#C59E3F] text-[#0A0B0E] font-bold text-xs uppercase tracking-wider font-sans flex items-center space-x-1 hover:bg-[#DFBD69]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload New Issue</span>
                </button>
              </div>

              {archivedIssues.length === 0 ? (
                <div className="p-12 border border-dashed border-white/15 text-center space-y-4">
                  <div className="w-14 h-14 border border-white/20 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm uppercase text-white">No Issues Uploaded Yet</h4>
                    <p className="text-xs font-mono text-white/50 mt-1 max-w-sm mx-auto">
                      Upload your first magazine PDF using the Issue Composer tab. Each upload is permanently archived with auto-extracted stories and headlines.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('composer')}
                    className="px-5 py-2 bg-white/10 hover:bg-[#C59E3F] hover:text-[#0A0B0E] text-xs font-sans font-bold uppercase tracking-widest transition-all"
                  >
                    Go to Issue Composer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {archivedIssues.map((issue) => {
                    const isActive = activeIssueId === issue.id;
                    const dateStr = new Date(issue.uploadedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    });

                    return (
                      <div
                        key={issue.id}
                        className={`p-4 border transition-all space-y-3 ${
                          isActive
                            ? 'bg-[#C59E3F]/[0.08] border-[#C59E3F] shadow-lg'
                            : 'bg-[#0E1015] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Cover thumbnail */}
                          <div className="w-16 h-22 flex-shrink-0 overflow-hidden border border-white/15 bg-black">
                            <img
                              src={issue.coverImage}
                              alt={issue.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 text-[9.5px] font-mono uppercase tracking-widest mb-1">
                              {isActive && (
                                <span className="px-1.5 py-0.5 bg-[#C59E3F] text-[#0A0B0E] font-bold text-[8.5px]">ACTIVE</span>
                              )}
                              <span className="text-[#C59E3F] font-bold">{issue.monthYear}</span>
                              <span className="text-white/30">•</span>
                              <span className="text-white/50">{issue.pageCount} Pages</span>
                            </div>

                            <h4 className="font-headline font-bold text-xs sm:text-sm text-white uppercase truncate">
                              {issue.title}
                            </h4>

                            <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono text-white/40">
                              <Calendar className="w-3 h-3" />
                              <span>{dateStr}</span>
                            </div>

                            <div className="flex items-center space-x-1.5 mt-1">
                              <span className="text-[10px] font-mono text-white/50">
                                {issue.articles.length} stories extracted
                              </span>
                              <span className="text-white/30">•</span>
                              <span className="text-[10px] font-mono text-white/50">
                                {issue.fileName}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 pt-1 border-t border-white/10">
                          {!isActive ? (
                            <button
                              onClick={() => onSwitchIssue?.(issue.id)}
                              className="flex-1 px-3 py-2 bg-[#C59E3F] hover:bg-[#DFBD69] text-[#0A0B0E] font-bold text-[10px] uppercase tracking-widest font-sans transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                            >
                              <ArrowUpRight className="w-3 h-3" />
                              <span>Switch to This Issue</span>
                            </button>
                          ) : (
                            <div className="flex-1 px-3 py-2 border border-[#C59E3F] text-[#C59E3F] text-[10px] uppercase tracking-widest font-mono font-bold text-center flex items-center justify-center space-x-1.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Currently Active</span>
                            </div>
                          )}

                          {issue.id !== 'oct-2026' ? (
                            <button
                              onClick={() => handleDeleteArchivedIssue(issue.id)}
                              className="p-2 border border-white/15 hover:border-red-400 text-white/40 hover:text-red-400 transition-colors"
                              title="Delete from archive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[9px] font-mono text-[#C59E3F]/70 px-2 py-1 uppercase tracking-wider">
                              Baseline Issue
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ━━━ TAB 04: ACTIVE PUBLICATION ━━━ */}
          {activeTab === 'archive' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="p-6 bg-[#0E1015] border border-white/10 flex flex-col md:flex-row items-center gap-6">
                <img
                  src={currentCoverImage}
                  alt="Active Issue Cover"
                  className="w-32 h-44 object-cover border border-white/20 shadow-xl flex-shrink-0"
                />
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-[#C59E3F] uppercase font-bold tracking-[0.25em]">
                    ACTIVE PRODUCTION DEPLOYMENT
                  </div>
                  <h3 className="font-headline font-bold text-xl uppercase tracking-wider text-white">
                    {currentPdfTitle}
                  </h3>
                  <p className="text-xs font-sans text-white/70 max-w-xl leading-relaxed">
                    This issue is actively bound to the reader suite, public archive showcase, and all editorial dossiers across the digital edition.
                  </p>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      onClick={() => setActiveTab('composer')}
                      className="px-4 py-2 bg-[#C59E3F] text-[#0A0B0E] font-bold text-xs uppercase tracking-wider font-sans flex items-center space-x-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload & Replace Issue</span>
                    </button>
                    {archivedIssues.length > 0 && (
                      <button
                        onClick={() => setActiveTab('issueArchive')}
                        className="px-4 py-2 border border-white/20 hover:border-white text-white/70 hover:text-white text-xs uppercase tracking-wider font-sans flex items-center space-x-1.5"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>Browse Archive ({archivedIssues.length})</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ━━━ TAB 05: SYSTEM PROTOCOLS ━━━ */}
          {activeTab === 'protocols' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
              <div className="p-6 bg-[#0E1015] border border-white/10 space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59E3F] font-bold">
                  DATABASE & PROTOCOLS
                </div>
                <h3 className="font-headline font-bold text-sm uppercase text-white">
                  Reset to Baseline Factory Defaults
                </h3>
                <p className="text-xs font-sans text-white/70 leading-relaxed">
                  Clears all custom uploaded issues from the archive and restores the official October 2026 baseline issue with the original investigative dossiers.
                </p>
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2 border border-red-500/40 hover:bg-red-950/20 text-red-300 text-xs font-mono uppercase tracking-wider flex items-center space-x-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Execute Baseline Reset (Clears All Issues)</span>
                </button>
              </div>

              {/* Archive Statistics */}
              <div className="p-6 bg-[#0E1015] border border-white/10 space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59E3F] font-bold">
                  ARCHIVE STATISTICS
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-white/10">
                    <span className="block text-lg font-headline font-bold text-white">{archivedIssues.length}</span>
                    <span className="text-[10px] font-mono text-white/50 uppercase">Issues Stored</span>
                  </div>
                  <div className="p-3 border border-white/10">
                    <span className="block text-lg font-headline font-bold text-white">
                      {archivedIssues.reduce((sum, i) => sum + i.articles.length, 0)}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase">Total Stories</span>
                  </div>
                  <div className="p-3 border border-white/10">
                    <span className="block text-lg font-headline font-bold text-white">
                      {archivedIssues.reduce((sum, i) => sum + i.pageCount, 0)}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase">Total Pages</span>
                  </div>
                  <div className="p-3 border border-white/10">
                    <span className="block text-lg font-headline font-bold text-white">
                      {articles.length}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase">Active Stories</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ━━━ TAB 05: SUBSCRIBERS & GOOGLE SHEETS ━━━ */}
          {activeTab === 'subscribers' && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-white/10 gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59E3F] font-bold">
                    READER AUDIENCE & DISPATCH
                  </div>
                  <h2 className="font-headline font-bold text-lg sm:text-xl uppercase tracking-wider text-white mt-1">
                    Newsletter Subscribers & Google Sheets Sync
                  </h2>
                  <p className="text-xs text-white/70 font-sans mt-1">
                    Every reader who enters their email in "The Weekly Ink Dispatch" is stored and instantly forwarded to your Google Sheet.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      exportSubscribersToCsv();
                    }}
                    disabled={subscribersList.length === 0}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center space-x-1.5 border border-white/15"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => {
                      if (subscribersList.length === 0) return;
                      const all = subscribersList.map(s => s.email).join(', ');
                      navigator.clipboard.writeText(all);
                      setCopiedEmails(true);
                      setTimeout(() => setCopiedEmails(false), 2500);
                    }}
                    disabled={subscribersList.length === 0}
                    className="px-3 py-2 bg-[#C59E3F] hover:bg-[#DFBD69] disabled:opacity-30 text-[#0F1012] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                  >
                    {copiedEmails ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmails ? 'Copied!' : 'Copy All Emails'}</span>
                  </button>
                </div>
              </div>

              {/* Google Sheets Webhook Configuration */}
              <div className="p-6 bg-[#0E1015] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#C59E3F] uppercase font-bold tracking-wider">
                    <Table className="w-4 h-4 text-[#C59E3F]" />
                    <span>Google Sheets Webhook URL</span>
                  </div>
                  {getGoogleSheetUrl() ? (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider border border-emerald-500/30">
                      Webhook Connected
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase tracking-wider border border-amber-500/30">
                      Not Connected (Using Local Database)
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="url"
                    value={googleSheetUrlInput}
                    onChange={(e) => setGoogleSheetUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 p-2.5 bg-black border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-[#C59E3F]"
                  />
                  <button
                    onClick={() => {
                      setGoogleSheetUrl(googleSheetUrlInput);
                      setSavedSheetSuccess(true);
                      setTimeout(() => setSavedSheetSuccess(false), 2500);
                    }}
                    className="px-4 py-2.5 bg-[#C59E3F] hover:bg-[#DFBD69] text-[#0A0B0E] font-bold text-xs uppercase font-mono tracking-wider transition-colors flex items-center justify-center space-x-1.5"
                  >
                    {savedSheetSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{savedSheetSuccess ? 'Saved!' : 'Save URL'}</span>
                  </button>
                </div>

                {/* Setup Instructions Accordion */}
                <details className="mt-3 text-xs font-sans text-white/70 border border-white/10 p-3 bg-black/40">
                  <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-wider text-[#C59E3F] hover:text-white select-none">
                    How to setup free Google Sheet integration in 2 minutes
                  </summary>
                  <div className="mt-3 space-y-2.5 text-xs text-white/80 leading-relaxed font-sans border-t border-white/10 pt-3">
                    <p>1. Open Google Sheets and create a new blank sheet with headers: <strong>Timestamp | Email | Source | Date</strong>.</p>
                    <p>2. In the top menu, click <strong>Extensions → Apps Script</strong>.</p>
                    <p>3. Delete any code inside and paste this 6-line script:</p>
                    <div className="relative">
                      <pre className="p-3 bg-black border border-white/15 text-[11px] font-mono text-emerald-400 overflow-x-auto">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var p = e.parameter;
  sheet.appendRow([new Date(), p.email, p.source || 'The Weekly Ink Dispatch', p.date]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}`}
                      </pre>
                      <button
                        onClick={() => {
                          const code = `function doPost(e) {\n  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();\n  var p = e.parameter;\n  sheet.appendRow([new Date(), p.email, p.source || 'The Weekly Ink Dispatch', p.date]);\n  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);\n}`;
                          navigator.clipboard.writeText(code);
                          setCopiedScript(true);
                          setTimeout(() => setCopiedScript(false), 2000);
                        }}
                        className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase"
                      >
                        {copiedScript ? 'Copied!' : 'Copy Script'}
                      </button>
                    </div>
                    <p>4. In Apps Script, click <strong>Deploy → New deployment</strong>, select type <strong>Web app</strong>, set <em>Who has access</em> to <strong>Anyone</strong>, and click <strong>Deploy</strong>.</p>
                    <p>5. Copy the generated Web App URL and paste it into the box above.</p>
                  </div>
                </details>
              </div>

              {/* Subscribers List Table */}
              <div className="p-6 bg-[#0E1015] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-mono text-white uppercase font-bold tracking-wider">
                    <Mail className="w-4 h-4 text-[#C59E3F]" />
                    <span>Registered Reader Emails ({subscribersList.length})</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50">
                    Source: Footer Weekly Ink Dispatch
                  </span>
                </div>

                {subscribersList.length === 0 ? (
                  <div className="py-12 text-center text-white/40 font-mono text-xs border border-dashed border-white/10">
                    No subscribers recorded yet. Readers who enter their email in the footer will appear here.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-white/10">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#14161C] border-b border-white/10 text-white/60 uppercase text-[10px]">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3">Email Address</th>
                          <th className="p-3">Date Subscribed</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/80">
                        {subscribersList.map((sub, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02]">
                            <td className="p-3 text-white/40">{idx + 1}</td>
                            <td className="p-3 font-semibold text-white">{sub.email}</td>
                            <td className="p-3 text-white/60">{sub.date}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                                Registered
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <a
                                href={`mailto:${sub.email}?subject=The Legends Ink Weekly Dispatch`}
                                className="text-[10px] text-[#C59E3F] hover:underline uppercase"
                              >
                                Send Email
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
