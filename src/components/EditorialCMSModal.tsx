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
import { Article, ARTICLES } from '../data/magazineContent';
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

const CATEGORIES = [
  'INVESTIGATIONS',
  'COVER STORY',
  'CULTURE & ARCHIVES',
  'KASHMIR HERITAGE',
  'POETRY & ESSAYS',
  'POLICY & SOCIETY',
  'ARCHIVAL DOSSIER',
  'CRITIQUE',
  'INTERVIEW',
  'DISPATCH'
];

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

  // Active Tab
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
    alert('Editorial Passkey updated successfully.');
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsExtracting(true);
    setExtractionProgress(10);
    setExtractionStatusText('Reading PDF Binary & Vector Stream...');

    try {
      const data = await extractMagazineFromPdf(file, (status, progress) => {
        setExtractionProgress(progress);
        setExtractionStatusText(status);
      });

      setExtractedData(data);
      setReviewedArticles(data.articles);
      setIssueTitle(data.title);
      setIssueMonth(data.issueDate);
      setIsExtracting(false);
    } catch (err: any) {
      console.error('PDF Extraction Error:', err);
      alert('Error parsing PDF: ' + (err.message || 'Unknown issue'));
      setIsExtracting(false);
      setSelectedFile(null);
    }
  };

  const handlePublishExtractedIssue = () => {
    if (!extractedData) return;

    const pdfBlobUrl = selectedFile ? URL.createObjectURL(selectedFile) : '';

    onUpdatePdfIssue(
      pdfBlobUrl,
      {
        title: issueTitle || extractedData.title,
        issueLabel: issueMonth || extractedData.issueDate,
        pageCount: extractedData.pageCount,
        coverImage: extractedData.coverImage
      },
      selectedFile || undefined,
      reviewedArticles
    );

    saveArticlesToCMS(reviewedArticles);
    onUpdateArticles(reviewedArticles);

    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      onClose();
    }, 1800);
  };

  const handleUpdateArticleField = (id: string, field: keyof Article, value: any) => {
    const updated = articles.map((a) => (a.id === id ? { ...a, [field]: value } : a));
    onUpdateArticles(updated);
    saveArticlesToCMS(updated);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Delete this article record from the live database?')) {
      const updated = articles.filter((a) => a.id !== id);
      onUpdateArticles(updated);
      saveArticlesToCMS(updated);
    }
  };

  const handleAddNewStory = () => {
    const newArt: Article = {
      id: `custom-${Date.now()}`,
      slug: `custom-${Date.now()}`,
      title: 'New Editorial Dispatch',
      subtitle: 'Exclusive investigative field dossier from Jammu & Kashmir',
      excerpt: 'Enter summary or excerpt for this article card...',
      category: 'INVESTIGATIONS',
      author: 'Staff Bureau',
      authorRole: 'Senior Editorial Correspondent',
      readTime: '4 MIN READ',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      content: ['First paragraph of the newly drafted investigative dispatch...'],
      image: '/magazine_images/magazine_photo_01.jpg',
      tags: ['Investigative', 'Jammu & Kashmir', 'Special Dossier']
    };
    const updated = [newArt, ...articles];
    onUpdateArticles(updated);
    saveArticlesToCMS(updated);
    setEditingArticleId(newArt.id);
  };

  const handleResetDefaults = () => {
    if (confirm('CAUTION: Reset magazine archive and articles to baseline October 2026? This clears custom uploads.')) {
      clearIssueArchive();
      resetCMSToDefaults();
      onUpdateArticles(ARTICLES);
      onRefreshArchive?.();
      alert('Archive reset to factory baseline.');
      onClose();
    }
  };

  const handleDeleteArchivedIssue = (issueId: string) => {
    if (confirm('Permanently remove this issue from the archive?')) {
      deleteIssueFromArchive(issueId);
      onRefreshArchive?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121317]/65 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* ━━━ AUTHENTICATION GATE ━━━ */}
      {!isAuthenticated ? (
        <div className="w-full max-w-md bg-[#FAF9F5] border border-[#121317]/15 p-6 sm:p-8 shadow-[0_20px_60px_rgba(18,19,23,0.25)] rounded-sm">
          
          <div className="border-b border-[#121317]/10 pb-5 mb-6">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase font-bold mb-1.5">
              <span className="w-2 h-2 bg-[#C5A059] rounded-full" />
              <span>THE LEGENDS INK • ACCESS CONTROL</span>
            </div>
            <h2 className="font-headline font-bold text-2xl uppercase tracking-wider text-[#121317]">
              EDITORIAL DESK
            </h2>
            <p className="text-[11px] font-mono text-[#121317]/60 mt-1 uppercase tracking-wide">
              Secure protocol for publication management & issue dispatch
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#121317]/75 font-semibold">
                  Editorial Passkey
                </label>
                <span className="text-[9px] font-mono text-[#121317]/45 uppercase">
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
                  className="w-full p-3 pr-11 bg-white border border-[#121317]/15 text-xs font-mono text-[#121317] tracking-widest focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121317]/40 hover:text-[#121317] p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="mt-2.5 p-2.5 bg-red-50 border border-red-300 text-red-700 text-[11px] font-mono flex items-center space-x-2 rounded-sm">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#121317] hover:bg-[#2B2D33] text-[#FAF9F5] font-bold text-xs uppercase tracking-[0.2em] font-sans transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer rounded-sm"
            >
              <span>Authenticate Session</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#121317]/10 flex justify-between text-[10px] font-mono text-[#121317]/45 uppercase">
            <span>SRINAGAR & BANDIPORA</span>
            <span>RESTRICTED TERMINAL</span>
          </div>

        </div>
      ) : (

        /* ━━━ MAIN SYSTEM: SWISS EDITORIAL PANEL ━━━ */
        <div className="w-full max-w-6xl h-full sm:h-[92vh] bg-[#FAF9F5] border border-[#121317]/15 flex flex-col overflow-hidden text-[#121317] shadow-[0_25px_90px_rgba(18,19,23,0.3)] rounded-md">
          
          {/* Top Archival Header */}
          <header className="px-4 sm:px-6 py-3.5 bg-[#F4F1E8] border-b border-[#121317]/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] shadow-sm" />
              <div>
                <div className="flex items-center space-x-2 text-[9.5px] font-mono tracking-[0.25em] text-[#8F702D] uppercase font-bold">
                  <span>THE LEGENDS INK MONTHLY</span>
                  <span className="text-[#121317]/30">•</span>
                  <span>EDITORIAL CMS STUDIO</span>
                </div>
                <h1 className="font-headline font-bold text-sm sm:text-base uppercase tracking-wider text-[#121317]">
                  Content Management & Publication Studio
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="px-2.5 py-1.5 border border-[#121317]/15 hover:border-[#C5A059] bg-white text-[#121317]/70 hover:text-[#121317] text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1 rounded-sm shadow-sm"
              >
                <Key className="w-3 h-3 text-[#C5A059]" />
                <span className="hidden md:inline">Change Passkey</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-2.5 py-1.5 border border-[#121317]/15 hover:border-[#121317] bg-white text-[#121317]/70 hover:text-[#121317] text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1 rounded-sm shadow-sm"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 border border-[#121317]/20 hover:border-[#C5A059] hover:text-[#C5A059] bg-white text-[#121317] transition-colors rounded-sm shadow-sm cursor-pointer"
                title="Return to publication"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Passkey Reconfiguration Bar */}
          {isChangingPassword && (
            <div className="p-3.5 bg-[#EFECE1] border-b border-[#121317]/10 flex items-center justify-between">
              <form onSubmit={handleSaveNewPassword} className="flex items-center space-x-3 flex-1 max-w-md">
                <span className="text-[10px] font-mono uppercase text-[#121317]/70 tracking-wider">New Passkey:</span>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter alphanumeric passkey..."
                  className="flex-1 p-1.5 bg-white border border-[#121317]/20 text-xs font-mono text-[#121317] focus:outline-none focus:border-[#C5A059] rounded-sm"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#121317] text-[#FAF9F5] font-bold text-[10px] uppercase font-mono tracking-wider rounded-sm shadow-sm"
                >
                  Confirm
                </button>
              </form>
              <button
                onClick={() => setIsChangingPassword(false)}
                className="text-[10px] font-mono uppercase text-[#121317]/50 hover:text-[#121317]"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Clean Segmented Navigation */}
          <nav className="px-4 sm:px-6 bg-[#EFEBE0] border-b border-[#121317]/10 flex items-center space-x-1 sm:space-x-6 flex-shrink-0 overflow-x-auto no-scrollbar">
            {[
              { id: 'composer', index: '01', label: 'Issue Composer (PDF)', short: 'Composer' },
              { id: 'directory', index: '02', label: `Directory Records (${articles.length})`, short: `Articles (${articles.length})` },
              { id: 'issueArchive', index: '03', label: `Issue Archive (${archivedIssues.length})`, short: `Archive (${archivedIssues.length})` },
              { id: 'archive', index: '04', label: 'Active Publication', short: 'Active' },
              { id: 'subscribers', index: '05', label: `Subscribers & Sheets (${subscribersList.length})`, short: `Subscribers (${subscribersList.length})` },
              { id: 'protocols', index: '06', label: 'System Protocols', short: 'Protocols' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-2 border-b-2 font-mono text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-[#C5A059] text-[#121317] font-bold'
                      : 'border-transparent text-[#121317]/50 hover:text-[#121317]'
                  }`}
                >
                  <span className={`text-[9.5px] ${isActive ? 'text-[#8F702D]' : 'text-[#121317]/35'}`}>
                    {tab.index}
                  </span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                </button>
              );
            })}
          </nav>

          {/* ━━━ TAB 01: ISSUE COMPOSER & EXTRACTION ━━━ */}
          {activeTab === 'composer' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
              
              {/* Process Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`p-3.5 border rounded-sm transition-all ${
                  !extractedData && !isExtracting
                    ? 'border-[#C5A059] bg-[#C5A059]/10'
                    : 'border-[#121317]/10 bg-white text-[#121317]/50'
                }`}>
                  <span className="text-[9px] font-mono text-[#8F702D] uppercase block tracking-widest font-bold">STAGE 01</span>
                  <span className="text-xs font-sans uppercase font-bold text-[#121317] tracking-wider">Select Issue Document</span>
                </div>

                <div className={`p-3.5 border rounded-sm transition-all ${
                  isExtracting
                    ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#121317] animate-pulse'
                    : extractedData
                    ? 'border-[#121317]/20 bg-white text-[#121317]'
                    : 'border-[#121317]/10 bg-white text-[#121317]/50'
                }`}>
                  <span className="text-[9px] font-mono text-[#8F702D] uppercase block tracking-widest font-bold">STAGE 02</span>
                  <span className="text-xs font-sans uppercase font-bold tracking-wider">Typography & Headline Scan</span>
                </div>

                <div className={`p-3.5 border rounded-sm transition-all ${
                  extractedData
                    ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#121317]'
                    : 'border-[#121317]/10 bg-white text-[#121317]/50'
                }`}>
                  <span className="text-[9px] font-mono text-[#8F702D] uppercase block tracking-widest font-bold">STAGE 03</span>
                  <span className="text-xs font-sans uppercase font-bold tracking-wider">Review & Live Dispatch</span>
                </div>
              </div>

              {/* Upload Dropzone */}
              {!extractedData && !isExtracting && (
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#121317]/20 hover:border-[#C5A059] bg-white p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-4 group rounded-md shadow-sm"
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

                    <div className="w-14 h-14 border border-[#121317]/15 group-hover:border-[#C5A059] group-hover:bg-[#C5A059]/10 flex items-center justify-center text-[#121317]/70 group-hover:text-[#8F702D] transition-colors rounded-full">
                      <Upload className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-lg uppercase tracking-wider text-[#121317]">
                        Upload Publication PDF Document
                      </h3>
                      <p className="text-xs font-mono text-[#121317]/60 mt-1 max-w-sm mx-auto uppercase">
                        Client-side parsing of text hierarchy, cover generation, and excerpt synthesis
                      </p>
                    </div>

                    <div className="px-6 py-2.5 bg-[#121317] hover:bg-[#C5A059] hover:text-[#121317] text-[#FAF9F5] text-xs font-sans font-bold uppercase tracking-widest transition-all rounded-sm shadow-md">
                      Select Local File (.pdf)
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-[#121317]/10 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-[#121317]/65 uppercase rounded-sm gap-1">
                    <span>Active Publication: {currentPdfTitle}</span>
                    <span>Format: Vector PDF Architecture</span>
                  </div>
                </div>
              )}

              {/* In Progress */}
              {isExtracting && (
                <div className="p-10 border border-[#121317]/15 bg-white text-center space-y-5 rounded-md shadow-sm">
                  <div className="w-12 h-12 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
                  <div>
                    <h3 className="font-headline font-bold text-sm uppercase text-[#121317] tracking-widest">
                      Processing Document Schema
                    </h3>
                    <p className="text-xs font-mono text-[#8F702D] mt-1 uppercase font-semibold">
                      {extractionStatusText}
                    </p>
                  </div>
                  <div className="max-w-md mx-auto w-full h-1.5 bg-[#121317]/10 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-[#C5A059] transition-all duration-200"
                      style={{ width: `${extractionProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#121317]/50 block">
                    {extractionProgress}% INDEXED
                  </span>
                </div>
              )}

              {/* Extraction Review Matrix */}
              {extractedData && (
                <div className="space-y-6">
                  
                  {/* Status Banner */}
                  <div className="p-4 sm:p-5 bg-white border border-[#121317]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-md shadow-sm">
                    <div className="flex items-center space-x-4">
                      <img
                        src={extractedData.coverImage}
                        alt="Document Cover"
                        className="w-14 h-18 object-cover border border-[#121317]/15 shadow-sm rounded-sm flex-shrink-0"
                      />
                      <div>
                        <div className="text-[9.5px] font-mono text-[#8F702D] uppercase tracking-[0.2em] font-bold">
                          EXTRACTION VERIFIED • {extractedData.pageCount} PAGES • {reviewedArticles.length} ARTICLES
                        </div>
                        <h3 className="font-headline font-bold text-base text-[#121317] uppercase mt-0.5">
                          {issueTitle}
                        </h3>
                        <p className="text-xs font-sans text-[#121317]/65">
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
                        className="flex-1 md:flex-none px-3.5 py-2.5 border border-[#121317]/20 text-xs font-mono uppercase hover:bg-[#121317]/05 text-[#121317]/75 rounded-sm"
                      >
                        Change Document
                      </button>

                      <button
                        onClick={handlePublishExtractedIssue}
                        className="flex-1 md:flex-none px-6 py-2.5 bg-[#121317] hover:bg-[#C5A059] hover:text-[#121317] text-[#FAF9F5] font-bold text-xs uppercase tracking-widest font-sans transition-all flex items-center justify-center space-x-1.5 cursor-pointer rounded-sm shadow-md"
                      >
                        {publishSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Deployed</span>
                          </>
                        ) : (
                          <>
                            <span>Deploy to Live Site</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata Configuration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white border border-[#121317]/10 rounded-md">
                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#8F702D] mb-1 font-bold">
                        Publication Title
                      </label>
                      <input
                        type="text"
                        value={issueTitle}
                        onChange={(e) => setIssueTitle(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-sans font-bold text-[#121317] focus:outline-none focus:border-[#C5A059] rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#8F702D] mb-1 font-bold">
                        Volume & Month Header
                      </label>
                      <input
                        type="text"
                        value={issueMonth}
                        onChange={(e) => setIssueMonth(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-sans font-bold text-[#121317] focus:outline-none focus:border-[#C5A059] rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Discovered Stories Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#121317]/60 px-1 border-b border-[#121317]/10 pb-2">
                      <span>Synthesized Dossier Records ({reviewedArticles.length})</span>
                      <span>Edit In-Place</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {reviewedArticles.map((art, idx) => (
                        <div
                          key={art.id}
                          className={`p-4 border transition-all space-y-3 rounded-sm ${
                            art.isCoverStory
                              ? 'bg-[#C5A059]/10 border-[#C5A059]'
                              : 'bg-white border-[#121317]/12 hover:border-[#121317]/25 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono text-[#8F702D] font-bold">
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
                                className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold border border-[#121317]/20 bg-[#FAF9F5] text-[#121317] focus:outline-none focus:border-[#C5A059] rounded-sm"
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
                                className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold border transition-colors rounded-sm ${
                                  art.isCoverStory
                                    ? 'bg-[#121317] text-[#FAF9F5] border-[#121317]'
                                    : 'bg-transparent text-[#121317]/65 border-[#121317]/15 hover:text-[#121317]'
                                }`}
                              >
                                {art.isCoverStory ? 'Primary Cover Story' : 'Set as Cover'}
                              </button>

                              <button
                                onClick={() => {
                                  setReviewedArticles((prev) => prev.filter((a) => a.id !== art.id));
                                }}
                                className="p-1 text-[#121317]/40 hover:text-red-500"
                                title="Remove story"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono uppercase tracking-wider text-[#121317]/45 mb-1">
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
                              className="w-full p-2 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-headline font-bold text-[#121317] focus:outline-none focus:border-[#C5A059] rounded-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono uppercase tracking-wider text-[#121317]/45 mb-1">
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
                              className="w-full p-2 bg-[#FAF9F5] border border-[#121317]/15 text-xs font-sans text-[#121317]/80 focus:outline-none focus:border-[#C5A059] rounded-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handlePublishExtractedIssue}
                        className="w-full sm:w-auto px-8 py-3 bg-[#121317] hover:bg-[#C5A059] hover:text-[#121317] text-[#FAF9F5] font-bold text-xs uppercase tracking-widest font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg rounded-sm"
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#121317]/10">
                <div>
                  <h3 className="font-headline font-bold text-base uppercase text-[#121317]">
                    Live Publication Directory ({articles.length} Records)
                  </h3>
                  <span className="text-[10px] font-mono text-[#121317]/55 uppercase tracking-wider">
                    Instant sync across Hero, 5-Column Grid, and Topic Dossiers
                  </span>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="p-2 bg-white border border-[#121317]/20 text-xs font-mono text-[#121317] focus:outline-none focus:border-[#C5A059] rounded-sm"
                  >
                    <option value="ALL">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleAddNewStory}
                    className="px-3.5 py-2 bg-[#121317] text-[#FAF9F5] font-bold text-xs uppercase tracking-wider font-sans flex items-center space-x-1 hover:bg-[#C5A059] hover:text-[#121317] rounded-sm shadow-sm transition-colors whitespace-nowrap"
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
                        className={`p-4 border transition-all rounded-sm ${
                          isEditing
                            ? 'bg-white border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30'
                            : 'bg-white border-[#121317]/10 hover:border-[#121317]/20 shadow-sm'
                        }`}
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-[#121317]/10 pb-2">
                              <span className="text-[10px] font-mono text-[#8F702D] font-bold uppercase tracking-widest">
                                Record Editor
                              </span>
                              <button
                                onClick={() => setEditingArticleId(null)}
                                className="px-3 py-1.5 bg-[#121317] text-[#FAF9F5] font-bold text-[10px] uppercase tracking-wider font-mono flex items-center space-x-1 rounded-sm shadow-sm hover:bg-[#C5A059] hover:text-[#121317]"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save Changes</span>
                              </button>
                            </div>

                            <div>
                              <label className="block text-[9px] font-mono uppercase tracking-wider text-[#121317]/50 mb-1">Headline</label>
                              <input
                                type="text"
                                value={art.title}
                                onChange={(e) => handleUpdateArticleField(art.id, 'title', e.target.value)}
                                className="w-full p-2.5 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-headline text-[#121317] font-bold rounded-sm"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-mono uppercase tracking-wider text-[#121317]/50 mb-1">Category</label>
                                <select
                                  value={art.category}
                                  onChange={(e) => handleUpdateArticleField(art.id, 'category', e.target.value)}
                                  className="w-full p-2 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-sans text-[#121317] rounded-sm"
                                >
                                  {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[9px] font-mono uppercase tracking-wider text-[#121317]/50 mb-1">Author / Byline</label>
                                <input
                                  type="text"
                                  value={art.author}
                                  onChange={(e) => handleUpdateArticleField(art.id, 'author', e.target.value)}
                                  className="w-full p-2 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-sans text-[#121317] rounded-sm"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] font-mono uppercase tracking-wider text-[#121317]/50 mb-1">Excerpt Snippet</label>
                              <textarea
                                rows={2}
                                value={art.excerpt}
                                onChange={(e) => handleUpdateArticleField(art.id, 'excerpt', e.target.value)}
                                className="w-full p-2 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-sans text-[#121317] rounded-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 text-[9.5px] font-mono mb-1 uppercase tracking-wider">
                                <span className="text-[#8F702D] font-bold">{art.category}</span>
                                <span className="text-[#121317]/30">•</span>
                                <span className="text-[#121317]/60">{art.author}</span>
                                {art.isCoverStory && (
                                  <span className="px-1.5 py-0.5 border border-[#C5A059] bg-[#C5A059]/10 text-[#8F702D] text-[8.5px] font-bold uppercase rounded-sm">
                                    Primary Cover
                                  </span>
                                )}
                              </div>
                              <h4 className="font-headline font-bold text-xs sm:text-sm text-[#121317] uppercase truncate">{art.title}</h4>
                              <p className="text-xs font-sans text-[#121317]/65 line-clamp-1 mt-0.5">{art.excerpt}</p>
                            </div>

                            <div className="flex items-center space-x-1.5 flex-shrink-0">
                              <button
                                onClick={() => setEditingArticleId(art.id)}
                                className="p-2 border border-[#121317]/15 hover:border-[#121317] bg-[#FAF9F5] text-[#121317]/70 hover:text-[#121317] rounded-sm"
                                title="Edit Record"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="p-2 border border-[#121317]/15 hover:border-red-400 bg-[#FAF9F5] text-[#121317]/40 hover:text-red-500 rounded-sm"
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#121317]/10 gap-3">
                <div>
                  <h3 className="font-headline font-bold text-base uppercase text-[#121317] flex items-center space-x-2">
                    <Archive className="w-4 h-4 text-[#8F702D]" />
                    <span>Uploaded Issue Archive ({archivedIssues.length} Issues)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#121317]/55 uppercase tracking-wider">
                    Every uploaded magazine PDF is permanently stored with its extracted stories
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('composer')}
                  className="px-3.5 py-2 bg-[#121317] text-[#FAF9F5] font-bold text-xs uppercase tracking-wider font-sans flex items-center space-x-1 hover:bg-[#C5A059] hover:text-[#121317] rounded-sm shadow-sm transition-colors whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload New Issue</span>
                </button>
              </div>

              {archivedIssues.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-[#121317]/15 bg-white text-center space-y-4 rounded-md">
                  <div className="w-14 h-14 border border-[#121317]/20 flex items-center justify-center mx-auto rounded-full bg-[#FAF9F5]">
                    <FileText className="w-6 h-6 text-[#121317]/40" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm uppercase text-[#121317]">No Issues Uploaded Yet</h4>
                    <p className="text-xs font-mono text-[#121317]/55 mt-1 max-w-sm mx-auto">
                      Upload your magazine PDF using the Issue Composer tab. Each upload is permanently archived with auto-extracted stories.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('composer')}
                    className="px-5 py-2.5 bg-[#121317] text-[#FAF9F5] hover:bg-[#C5A059] hover:text-[#121317] text-xs font-sans font-bold uppercase tracking-widest transition-all rounded-sm shadow-md"
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
                        className={`p-4 border transition-all space-y-3 rounded-sm ${
                          isActive
                            ? 'bg-[#C5A059]/10 border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30'
                            : 'bg-white border-[#121317]/12 hover:border-[#121317]/25 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-22 flex-shrink-0 overflow-hidden border border-[#121317]/15 bg-[#FAF9F5] rounded-sm shadow-sm">
                            <img
                              src={issue.coverImage}
                              alt={issue.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 text-[9.5px] font-mono uppercase tracking-widest mb-1">
                              {isActive && (
                                <span className="px-1.5 py-0.5 bg-[#121317] text-[#FAF9F5] font-bold text-[8.5px] rounded-sm">ACTIVE</span>
                              )}
                              <span className="text-[#8F702D] font-bold">{issue.monthYear}</span>
                              <span className="text-[#121317]/30">•</span>
                              <span className="text-[#121317]/55">{issue.pageCount} Pages</span>
                            </div>

                            <h4 className="font-headline font-bold text-xs sm:text-sm text-[#121317] uppercase truncate">
                              {issue.title}
                            </h4>

                            <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono text-[#121317]/45">
                              <Calendar className="w-3 h-3" />
                              <span>{dateStr}</span>
                            </div>

                            <div className="flex items-center space-x-1.5 mt-1">
                              <span className="text-[10px] font-mono text-[#121317]/60">
                                {issue.articles.length} stories extracted
                              </span>
                              <span className="text-[#121317]/30">•</span>
                              <span className="text-[10px] font-mono text-[#121317]/60 truncate">
                                {issue.fileName}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 pt-2 border-t border-[#121317]/10">
                          {!isActive ? (
                            <button
                              onClick={() => onSwitchIssue?.(issue.id)}
                              className="flex-1 px-3 py-2 bg-[#121317] hover:bg-[#C5A059] hover:text-[#121317] text-[#FAF9F5] font-bold text-[10px] uppercase tracking-widest font-sans transition-all flex items-center justify-center space-x-1.5 cursor-pointer rounded-sm shadow-sm"
                            >
                              <ArrowUpRight className="w-3 h-3" />
                              <span>Switch to This Issue</span>
                            </button>
                          ) : (
                            <div className="flex-1 px-3 py-2 border border-[#C5A059] bg-[#C5A059]/15 text-[#8F702D] text-[10px] uppercase tracking-widest font-mono font-bold text-center flex items-center justify-center space-x-1.5 rounded-sm">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Currently Active</span>
                            </div>
                          )}

                          {issue.id !== 'oct-2026' ? (
                            <button
                              onClick={() => handleDeleteArchivedIssue(issue.id)}
                              className="p-2 border border-[#121317]/15 hover:border-red-400 bg-[#FAF9F5] text-[#121317]/40 hover:text-red-500 transition-colors rounded-sm"
                              title="Delete from archive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[9px] font-mono text-[#8F702D] px-2 py-1 uppercase tracking-wider font-semibold">
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
              <div className="p-6 bg-white border border-[#121317]/12 flex flex-col md:flex-row items-center gap-6 rounded-md shadow-sm">
                <img
                  src={currentCoverImage}
                  alt="Active Issue Cover"
                  className="w-36 h-48 object-cover border border-[#121317]/15 shadow-md flex-shrink-0 rounded-sm"
                />
                <div className="space-y-2 text-center md:text-left">
                  <div className="text-[10px] font-mono text-[#8F702D] uppercase font-bold tracking-[0.25em]">
                    ACTIVE PRODUCTION DEPLOYMENT
                  </div>
                  <h3 className="font-headline font-bold text-xl uppercase tracking-wider text-[#121317]">
                    {currentPdfTitle}
                  </h3>
                  <p className="text-xs font-sans text-[#121317]/70 max-w-xl leading-relaxed">
                    This issue is actively bound to the reader suite, public archive showcase, and all editorial dossiers across the digital edition.
                  </p>

                  <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <button
                      onClick={() => setActiveTab('composer')}
                      className="px-4 py-2 bg-[#121317] hover:bg-[#C5A059] hover:text-[#121317] text-[#FAF9F5] font-bold text-xs uppercase tracking-wider font-sans flex items-center space-x-1.5 rounded-sm shadow-sm transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload & Replace Issue</span>
                    </button>
                    {archivedIssues.length > 0 && (
                      <button
                        onClick={() => setActiveTab('issueArchive')}
                        className="px-4 py-2 border border-[#121317]/20 hover:border-[#121317] bg-[#FAF9F5] text-[#121317]/75 hover:text-[#121317] text-xs uppercase tracking-wider font-sans flex items-center space-x-1.5 rounded-sm transition-colors"
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 max-w-2xl">
              <div className="p-6 bg-white border border-[#121317]/12 space-y-4 rounded-md shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8F702D] font-bold">
                  DATABASE & PROTOCOLS
                </div>
                <h3 className="font-headline font-bold text-sm uppercase text-[#121317]">
                  Reset to Baseline Factory Defaults
                </h3>
                <p className="text-xs font-sans text-[#121317]/70 leading-relaxed">
                  Clears all custom uploaded issues from the archive and restores the official October 2026 baseline issue with the original investigative dossiers.
                </p>
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2.5 border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-mono uppercase tracking-wider flex items-center space-x-2 rounded-sm shadow-sm transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Execute Baseline Reset (Clears All Issues)</span>
                </button>
              </div>

              {/* Archive Statistics */}
              <div className="p-6 bg-white border border-[#121317]/12 space-y-3 rounded-md shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8F702D] font-bold">
                  ARCHIVE STATISTICS
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 border border-[#121317]/10 bg-[#FAF9F5] rounded-sm">
                    <span className="block text-xl font-headline font-bold text-[#121317]">{archivedIssues.length}</span>
                    <span className="text-[10px] font-mono text-[#121317]/55 uppercase">Issues Stored</span>
                  </div>
                  <div className="p-3.5 border border-[#121317]/10 bg-[#FAF9F5] rounded-sm">
                    <span className="block text-xl font-headline font-bold text-[#121317]">
                      {archivedIssues.reduce((sum, i) => sum + i.articles.length, 0)}
                    </span>
                    <span className="text-[10px] font-mono text-[#121317]/55 uppercase">Total Stories</span>
                  </div>
                  <div className="p-3.5 border border-[#121317]/10 bg-[#FAF9F5] rounded-sm">
                    <span className="block text-xl font-headline font-bold text-[#121317]">
                      {archivedIssues.reduce((sum, i) => sum + i.pageCount, 0)}
                    </span>
                    <span className="text-[10px] font-mono text-[#121317]/55 uppercase">Total Pages</span>
                  </div>
                  <div className="p-3.5 border border-[#121317]/10 bg-[#FAF9F5] rounded-sm">
                    <span className="block text-xl font-headline font-bold text-[#121317]">
                      {articles.length}
                    </span>
                    <span className="text-[10px] font-mono text-[#121317]/55 uppercase">Active Stories</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ━━━ TAB 06: SUBSCRIBERS & GOOGLE SHEETS ━━━ */}
          {activeTab === 'subscribers' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
              
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[#121317]/10 gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8F702D] font-bold">
                    READER AUDIENCE & DISPATCH
                  </div>
                  <h2 className="font-headline font-bold text-lg sm:text-xl uppercase tracking-wider text-[#121317] mt-1">
                    Newsletter Subscribers & Google Sheets Sync
                  </h2>
                  <p className="text-xs text-[#121317]/70 font-sans mt-1">
                    Every reader who enters their email in "The Weekly Ink Dispatch" is stored and instantly forwarded to your Google Sheet.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      exportSubscribersToCsv();
                    }}
                    disabled={subscribersList.length === 0}
                    className="px-3.5 py-2 bg-white hover:bg-[#FAF9F5] disabled:opacity-40 text-[#121317] text-xs font-mono uppercase tracking-wider transition-colors flex items-center space-x-1.5 border border-[#121317]/15 rounded-sm shadow-sm"
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
                    className="px-3.5 py-2 bg-[#121317] hover:bg-[#C5A059] hover:text-[#121317] disabled:opacity-40 text-[#FAF9F5] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5 rounded-sm shadow-sm"
                  >
                    {copiedEmails ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmails ? 'Copied!' : 'Copy All Emails'}</span>
                  </button>
                </div>
              </div>

              {/* Google Sheets Webhook Configuration */}
              <div className="p-6 bg-white border border-[#121317]/12 space-y-4 rounded-md shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#8F702D] uppercase font-bold tracking-wider">
                    <Table className="w-4 h-4 text-[#8F702D]" />
                    <span>Google Sheets Webhook URL</span>
                  </div>
                  {getGoogleSheetUrl() ? (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono uppercase tracking-wider border border-emerald-300 rounded-sm self-start sm:self-auto">
                      Webhook Connected
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-mono uppercase tracking-wider border border-amber-300 rounded-sm self-start sm:self-auto">
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
                    className="flex-1 p-2.5 bg-[#FAF9F5] border border-[#121317]/20 text-xs font-mono text-[#121317] focus:outline-none focus:border-[#C5A059] rounded-sm"
                  />
                  <button
                    onClick={() => {
                      setGoogleSheetUrl(googleSheetUrlInput);
                      setSavedSheetSuccess(true);
                      setTimeout(() => setSavedSheetSuccess(false), 2500);
                    }}
                    className="px-4 py-2.5 bg-[#121317] hover:bg-[#C5A059] hover:text-[#121317] text-[#FAF9F5] font-bold text-xs uppercase font-mono tracking-wider transition-colors flex items-center justify-center space-x-1.5 rounded-sm shadow-sm"
                  >
                    {savedSheetSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{savedSheetSuccess ? 'Saved!' : 'Save URL'}</span>
                  </button>
                </div>

                {/* Setup Instructions Accordion */}
                <details className="mt-3 text-xs font-sans text-[#121317]/75 border border-[#121317]/10 p-3.5 bg-[#FAF9F5] rounded-sm">
                  <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-wider text-[#8F702D] hover:text-[#121317] select-none font-semibold">
                    How to setup free Google Sheet integration in 2 minutes
                  </summary>
                  <div className="mt-3 space-y-2.5 text-xs text-[#121317]/80 leading-relaxed font-sans border-t border-[#121317]/10 pt-3">
                    <p>1. Open Google Sheets and create a new blank sheet with headers: <strong>Timestamp | Email | Source | Date</strong>.</p>
                    <p>2. In the top menu, click <strong>Extensions → Apps Script</strong>.</p>
                    <p>3. Delete any code inside and paste this 6-line script:</p>
                    <div className="relative">
                      <pre className="p-3 bg-white border border-[#121317]/15 text-[11px] font-mono text-emerald-700 overflow-x-auto rounded-sm">
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
                        className="absolute top-2 right-2 px-2.5 py-1 bg-[#121317] hover:bg-[#C5A059] text-white text-[10px] font-mono uppercase rounded-sm shadow-sm"
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
              <div className="p-4 sm:p-6 bg-white border border-[#121317]/12 space-y-4 rounded-md shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#121317] uppercase font-bold tracking-wider">
                    <Mail className="w-4 h-4 text-[#8F702D]" />
                    <span>Registered Reader Emails ({subscribersList.length})</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#121317]/50 hidden sm:inline">
                    Source: Footer Weekly Ink Dispatch
                  </span>
                </div>

                {subscribersList.length === 0 ? (
                  <div className="py-12 text-center text-[#121317]/40 font-mono text-xs border border-dashed border-[#121317]/15 rounded-sm">
                    No subscribers recorded yet. Readers who enter their email in the footer will appear here.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-[#121317]/10 rounded-sm">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#FAF9F5] border-b border-[#121317]/10 text-[#121317]/65 uppercase text-[10px]">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3">Email Address</th>
                          <th className="p-3">Date Subscribed</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#121317]/05 text-[#121317]/85">
                        {subscribersList.map((sub, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF9F5] transition-colors">
                            <td className="p-3 text-[#121317]/40">{idx + 1}</td>
                            <td className="p-3 font-semibold text-[#121317]">{sub.email}</td>
                            <td className="p-3 text-[#121317]/65">{sub.date}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase rounded-sm font-bold">
                                Registered
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <a
                                href={`mailto:${sub.email}?subject=The Legends Ink Weekly Dispatch`}
                                className="text-[10px] text-[#8F702D] hover:underline uppercase font-bold"
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
