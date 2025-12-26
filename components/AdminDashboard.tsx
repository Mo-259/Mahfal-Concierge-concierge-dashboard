import React, { useState, useEffect } from 'react';
import { 
  X, Search, Filter, Calendar, MapPin, User, Phone, 
  Mail, MessageSquare, CheckCircle, Clock, Archive, 
  Trash2, ExternalLink, ChevronRight, LayoutDashboard,
  Bell, Loader, CheckSquare, XCircle, FileCheck, AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type LeadStatus = 'new' | 'in_progress' | 'booked' | 'completed' | 'dismissed' | 'archived';

interface Submission {
  id: string;
  submittedAt: string;
  status: LeadStatus;
  occasionType: string;
  locationArea: string;
  date: string;
  isFlexibleDate: boolean;
  guests: number;
  budgetRange: string;
  venuePreference: string;
  suppliers: string[];
  vibe: string[];
  notes: string;
  fullName: string;
  phone: string;
  isWhatsapp: boolean;
  email: string;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string, color: string, icon: any }> = {
  new: { label: 'New', color: 'text-brand-red border-brand-red bg-brand-red/10', icon: Bell },
  in_progress: { label: 'In Progress', color: 'text-blue-400 border-blue-400 bg-blue-400/10', icon: Loader },
  booked: { label: 'Booked', color: 'text-green-400 border-green-400 bg-green-400/10', icon: CheckSquare },
  completed: { label: 'Completed', color: 'text-purple-400 border-purple-400 bg-purple-400/10', icon: FileCheck },
  dismissed: { label: 'Dismissed', color: 'text-gray-400 border-gray-400 bg-gray-400/10', icon: XCircle },
  archived: { label: 'Archived', color: 'text-white/30 border-white/20 bg-white/5', icon: Archive },
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | LeadStatus>('all');

  useEffect(() => {
    // Load submissions from local storage
    const loadData = () => {
      try {
        const data = localStorage.getItem('mahfal_submissions');
        if (data) {
          // Migration for old data if necessary (e.g. 'contacted' -> 'in_progress')
          const parsed = JSON.parse(data).map((s: any) => ({
            ...s,
            status: s.status === 'contacted' ? 'in_progress' : s.status
          }));
          setSubmissions(parsed);
        }
      } catch (e) {
        console.error("Failed to load submissions");
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = submissions.map(s => s.id === id ? { ...s, status: newStatus } : s);
    setSubmissions(updated);
    localStorage.setItem('mahfal_submissions', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this lead?")) {
        const updated = submissions.filter(s => s.id !== id);
        setSubmissions(updated);
        localStorage.setItem('mahfal_submissions', JSON.stringify(updated));
        if (selectedId === id) setSelectedId(null);
    }
  };

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'all') return !['dismissed', 'archived', 'completed'].includes(s.status);
    return s.status === filter;
  });

  const selectedSubmission = submissions.find(s => s.id === selectedId);

  // Stats for sidebar
  const getCount = (status: LeadStatus) => submissions.filter(s => s.status === status).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-black text-brand-white flex font-sans">
      
      {/* Sidebar */}
      <div className="w-20 lg:w-64 border-r border-white/10 flex flex-col bg-brand-dark1">
        <div className="p-6 flex items-center gap-3 border-b border-white/10 h-20">
          <div className="w-8 h-8 bg-brand-red rounded-none flex items-center justify-center font-bold text-white">M</div>
          <span className="font-semibold text-lg hidden lg:block tracking-wide">Concierge</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <button 
            onClick={() => setFilter('all')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-none transition-colors ${filter === 'all' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} />
            <span className="hidden lg:block">Active Overview</span>
          </button>

          <div className="py-4 px-3 hidden lg:block">
            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Pipeline</span>
          </div>

          <button 
            onClick={() => setFilter('new')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-none transition-colors ${filter === 'new' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Bell size={20} />
            <span className="hidden lg:block">New</span>
            {getCount('new') > 0 && (
                <span className="ml-auto bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden lg:block">
                    {getCount('new')}
                </span>
            )}
          </button>
          
          <button 
            onClick={() => setFilter('in_progress')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-none transition-colors ${filter === 'in_progress' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Loader size={20} />
            <span className="hidden lg:block">In Progress</span>
            {getCount('in_progress') > 0 && (
                <span className="ml-auto bg-white/10 text-white/60 text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden lg:block">
                    {getCount('in_progress')}
                </span>
            )}
          </button>

          <button 
            onClick={() => setFilter('booked')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-none transition-colors ${filter === 'booked' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <CheckSquare size={20} />
            <span className="hidden lg:block">Booked</span>
          </button>

          <div className="py-4 px-3 hidden lg:block">
            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">History</span>
          </div>

           <button 
            onClick={() => setFilter('completed')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-none transition-colors ${filter === 'completed' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <FileCheck size={20} />
            <span className="hidden lg:block">Completed</span>
          </button>

          <button 
            onClick={() => setFilter('dismissed')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-none transition-colors ${filter === 'dismissed' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <XCircle size={20} />
            <span className="hidden lg:block">Dismissed</span>
          </button>

           <button 
            onClick={() => setFilter('archived')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-none transition-colors ${filter === 'archived' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Archive size={20} />
            <span className="hidden lg:block">Archived</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={onClose} className="flex items-center gap-3 text-white/50 hover:text-white transition-colors w-full px-3 py-2">
            <ExternalLink size={18} />
            <span className="hidden lg:block">Back to Site</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar */}
        <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-brand-black/50 backdrop-blur-md">
           <h1 className="text-xl font-semibold flex items-center gap-3">
             {filter === 'all' ? 'Active Dashboard' : STATUS_CONFIG[filter]?.label || 'Dashboard'}
             {filter === 'all' && <span className="text-xs font-normal text-white/40 bg-white/5 px-2 py-1 rounded-full">Excludes completed/dismissed</span>}
           </h1>
           <div className="flex items-center gap-4">
             <div className="bg-brand-dark2 border border-white/10 flex items-center px-3 py-2 w-64">
               <Search size={16} className="text-white/40 mr-2" />
               <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/20" />
             </div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-red to-orange-500 border border-white/20"></div>
           </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 flex overflow-hidden">
           
           {/* List View */}
           <div className={`${selectedId ? 'hidden md:block w-full md:w-1/3 lg:w-1/4' : 'w-full'} border-r border-white/10 overflow-y-auto bg-brand-black`}>
             {filteredSubmissions.length === 0 ? (
                <div className="p-10 text-center text-white/30 flex flex-col items-center">
                    <Filter size={32} className="mb-4 opacity-50" />
                    <p>No {filter === 'all' ? 'active' : STATUS_CONFIG[filter]?.label.toLowerCase()} leads found.</p>
                </div>
             ) : (
                filteredSubmissions.map(sub => (
                    <div 
                      key={sub.id}
                      onClick={() => setSelectedId(sub.id)}
                      className={`p-5 border-b border-white/5 cursor-pointer hover:bg-brand-dark2 transition-colors ${selectedId === sub.id ? 'bg-brand-dark2 border-l-2 border-l-brand-red' : 'border-l-2 border-l-transparent'}`}
                    >
                       <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            {/* Status Indicator */}
                           <div className={`w-2 h-2 rounded-full ${sub.status === 'new' ? 'bg-brand-red animate-pulse' : 
                                            sub.status === 'in_progress' ? 'bg-blue-400' : 
                                            sub.status === 'booked' ? 'bg-green-400' :
                                            sub.status === 'completed' ? 'bg-purple-400' :
                                            'bg-white/20'}`} 
                           />
                           <span className={`text-[10px] font-bold uppercase tracking-wider ${
                               sub.status === 'new' ? 'text-brand-red' : 'text-white/40'
                           }`}>
                             {STATUS_CONFIG[sub.status]?.label}
                           </span>
                         </div>
                         <span className="text-[10px] text-white/30">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                       </div>
                       <h3 className={`text-white font-medium mb-1 ${['dismissed', 'archived'].includes(sub.status) ? 'line-through opacity-50' : ''}`}>
                           {sub.fullName}
                       </h3>
                       <p className="text-sm text-white/60 mb-2">{sub.occasionType} • {sub.guests} ppl</p>
                       <div className="flex items-center gap-2 text-xs text-white/40">
                         <MapPin size={12} /> {sub.locationArea}
                       </div>
                    </div>
                ))
             )}
           </div>

           {/* Detail View */}
           <div className={`flex-1 overflow-y-auto bg-brand-dark2 ${!selectedId ? 'hidden md:flex items-center justify-center' : ''}`}>
             {!selectedId ? (
                <div className="text-center text-white/20">
                    <LayoutDashboard size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Select a lead to view details</p>
                </div>
             ) : (
                selectedSubmission && (
                    <div className="p-8 max-w-4xl mx-auto w-full">
                       
                       {/* Header Actions */}
                       <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-3xl font-semibold text-white">{selectedSubmission.fullName}</h2>
                                {(() => {
                                    const StatusIcon = STATUS_CONFIG[selectedSubmission.status].icon;
                                    return (
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full border flex items-center gap-2 ${STATUS_CONFIG[selectedSubmission.status].color}`}>
                                            <StatusIcon size={12} />
                                            {STATUS_CONFIG[selectedSubmission.status].label.toUpperCase()}
                                        </span>
                                    );
                                })()}
                            </div>
                            <p className="text-white/50 flex items-center gap-2 text-sm">
                                <Clock size={14} /> Submitted {new Date(selectedSubmission.submittedAt).toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="relative">
                                <select 
                                    value={selectedSubmission.status}
                                    onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value as LeadStatus)}
                                    className="bg-black border border-white/10 text-white text-sm pl-4 pr-10 py-3 rounded-none outline-none focus:border-brand-red appearance-none cursor-pointer hover:border-white/30 transition-colors w-40"
                                >
                                    <option value="new">New</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="booked">Booked</option>
                                    <option value="completed">Completed</option>
                                    <option value="dismissed">Dismissed</option>
                                    <option value="archived">Archived</option>
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/40 pointer-events-none" size={14} />
                            </div>
                            <button 
                                onClick={() => handleDelete(selectedSubmission.id)}
                                title="Delete permanently"
                                className="px-4 border border-white/10 text-white/40 hover:text-red-500 hover:border-red-500 transition-colors bg-black"
                            >
                                <Trash2 size={18} />
                            </button>
                          </div>
                       </div>

                       {/* Grid Details */}
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          
                          {/* Card 1: Event Summary */}
                          <div className="bg-brand-black p-6 border border-white/5 rounded-none">
                             <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Calendar size={14} /> Event Details
                             </h3>
                             <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/60">Occasion</span>
                                    <span className="text-white">{selectedSubmission.occasionType}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/60">Date</span>
                                    <span className="text-white flex items-center gap-2">
                                        {selectedSubmission.isFlexibleDate ? 'Flexible' : selectedSubmission.date}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/60">Guests</span>
                                    <span className="text-white">{selectedSubmission.guests}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/60">Budget</span>
                                    <span className="text-white">{selectedSubmission.budgetRange}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/60">Setting</span>
                                    <span className="text-white">{selectedSubmission.venuePreference}</span>
                                </div>
                             </div>
                          </div>

                          {/* Card 2: Contact & Location */}
                          <div className="bg-brand-black p-6 border border-white/5 rounded-none">
                             <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <User size={14} /> Logistics & Contact
                             </h3>
                             <div className="space-y-4">
                                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                                    <MapPin className="text-brand-red" size={18} />
                                    <div>
                                        <span className="block text-white">{selectedSubmission.locationArea}</span>
                                        <span className="text-xs text-white/40">Requested Area</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                                    <Phone className="text-white/60" size={18} />
                                    <div className="flex-1">
                                        <span className="block text-white">{selectedSubmission.phone}</span>
                                        {selectedSubmission.isWhatsapp && <span className="text-[10px] text-green-500 flex items-center gap-1 mt-1">WhatsApp Preferred <CheckCircle size={10} /></span>}
                                    </div>
                                </div>
                                {selectedSubmission.email && (
                                    <div className="flex items-center gap-3 py-2 border-b border-white/5">
                                        <Mail className="text-white/60" size={18} />
                                        <span className="text-white">{selectedSubmission.email}</span>
                                    </div>
                                )}
                             </div>
                          </div>

                          {/* Card 3: Requirements */}
                          <div className="col-span-1 lg:col-span-2 bg-brand-black p-6 border border-white/5 rounded-none">
                             <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <AlertCircle size={14} /> Requirements & Notes
                             </h3>
                             
                             <div className="mb-6">
                                <h4 className="text-xs text-white/50 mb-3">Requested Suppliers</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSubmission.suppliers.length > 0 ? selectedSubmission.suppliers.map(s => (
                                        <span key={s} className="px-3 py-1 bg-white/10 text-white text-sm rounded-none border border-white/10">{s}</span>
                                    )) : <span className="text-white/30 italic text-sm">No suppliers requested</span>}
                                </div>
                             </div>

                             <div className="mb-6">
                                <h4 className="text-xs text-white/50 mb-3">Vibe</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSubmission.vibe.length > 0 ? selectedSubmission.vibe.map(v => (
                                        <span key={v} className="px-3 py-1 border border-white/20 text-white/80 text-sm rounded-none">{v}</span>
                                    )) : <span className="text-white/30 italic text-sm">No vibe selected</span>}
                                </div>
                             </div>

                             <div>
                                <h4 className="text-xs text-white/50 mb-3">Additional Notes</h4>
                                <p className="text-white/80 bg-brand-dark2 p-4 border border-white/5 text-sm leading-relaxed whitespace-pre-wrap">
                                    {selectedSubmission.notes || "No notes provided."}
                                </p>
                             </div>
                          </div>

                       </div>

                    </div>
                )
             )}
           </div>
        </div>

      </div>
    </div>
  );
};