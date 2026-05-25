"use client";

import { useState } from "react";
import { 
  Plus, Search, Filter, Kanban as KanbanIcon, 
  List as ListIcon, X, MapPin, Phone, 
  Trash2, ArrowRightLeft, Sparkles, MessageSquare, 
  PhoneCall, Calendar, Share2 
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  phone: string;
  bhk: string;
  location: string;
  budget: string;
  date: string;
  propertyType: "Plot" | "Apartment" | "Villa" | "Commercial";
  aiScore: number;
  lastInteraction: string;
  stage: "New" | "Interested" | "Site Visit" | "Negotiation" | "Closed" | "Lost";
}

export default function ClientPipeline() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientBhk, setNewClientBhk] = useState("3 BHK");
  const [newClientLoc, setNewClientLoc] = useState("");
  const [newClientBudget, setNewClientBudget] = useState("");
  const [newClientProp, setNewClientProp] = useState<Client["propertyType"]>("Apartment");

  const [clients, setClients] = useState<Client[]>([
    { id: "1", name: "Ramesh Kumar", phone: "98765 43210", bhk: "3 BHK", location: "Kokapet", budget: "₹1.80 Cr", date: "25 May", propertyType: "Apartment", aiScore: 92, lastInteraction: "Call yesterday", stage: "New" },
    { id: "2", name: "Vikas Sharma", phone: "98765 55210", bhk: "2400 sqft", location: "Gachibowli", budget: "₹1.40 Cr", date: "24 May", propertyType: "Plot", aiScore: 78, lastInteraction: "WA today", stage: "New" },
    { id: "3", name: "Pooja Madhu", phone: "98765 44210", bhk: "3 BHK", location: "Gachibowli", budget: "₹1.50 Cr", date: "24 May", propertyType: "Apartment", aiScore: 84, lastInteraction: "No contact", stage: "New" },
    { id: "4", name: "Neha Singh", phone: "98765 33210", bhk: "2 BHK", location: "Financial Dist", budget: "₹85 Lakhs", date: "Today", propertyType: "Apartment", aiScore: 95, lastInteraction: "Brochure shared", stage: "Interested" },
    { id: "5", name: "Arun Reddy", phone: "98765 22210", bhk: "4 BHK", location: "Kokapet", budget: "₹3.50 Cr", date: "Tomorrow", propertyType: "Villa", aiScore: 81, lastInteraction: "Call last week", stage: "Site Visit" },
    { id: "6", name: "Mansi Gupta", phone: "98765 66210", bhk: "4 BHK", location: "Kokapet", budget: "₹3.20 Cr", date: "23 May", propertyType: "Villa", aiScore: 88, lastInteraction: "Negotiating", stage: "Negotiation" },
    { id: "7", name: "Karthik Iyer", phone: "98765 11210", bhk: "Office Space", location: "Hitech City", budget: "₹5.50 Cr", date: "22 May", propertyType: "Commercial", aiScore: 90, lastInteraction: "Closed proposal", stage: "Closed" },
  ]);

  const stages: Client["stage"][] = ["New", "Interested", "Site Visit", "Negotiation", "Closed", "Lost"];

  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.bhk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientLoc || !newClientBudget) return;

    const newClient: Client = {
      id: Date.now().toString(),
      name: newClientName,
      phone: newClientPhone || "98765 00000",
      bhk: newClientBhk,
      location: newClientLoc,
      budget: newClientBudget,
      date: "Just now",
      propertyType: newClientProp,
      aiScore: Math.floor(65 + Math.random() * 30),
      lastInteraction: "Lead logged",
      stage: "New",
    };

    setClients([newClient, ...clients]);
    setNewClientName("");
    setNewClientPhone("");
    setNewClientLoc("");
    setNewClientBudget("");
    setShowAddModal(false);
  };

  const handleMoveStage = (id: string, currentStage: Client["stage"]) => {
    const nextStageIndex = (stages.indexOf(currentStage) + 1) % stages.length;
    const nextStage = stages[nextStageIndex];
    setClients(clients.map(c => c.id === id ? { ...c, stage: nextStage } : c));
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Clients Pipeline</h1>
          <p className="text-[#64748b] text-xs font-semibold mt-0.5">Manage operational stages, RERA match preferences, and AI scoring metrics.</p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto shrink-0">
          <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl text-xs font-bold">
            <button 
              onClick={() => setView("kanban")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${view === "kanban" ? "bg-[#25d366] text-white" : "text-slate-500 hover:text-slate-700"}`}
            >
              <KanbanIcon className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button 
              onClick={() => setView("list")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${view === "list" ? "bg-[#25d366] text-white" : "text-slate-500 hover:text-slate-700"}`}
            >
              <ListIcon className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="glow-button px-4 py-2.5 bg-[#25d366] hover:bg-[#16c47f] text-white font-bold text-xs rounded-xl transition flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* Search Filter Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search lead name, location, property type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-250 focus:border-[#25d366] rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 outline-none transition"
          />
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 flex items-center space-x-1.5 text-xs font-bold transition">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Boards */}
      {view === "kanban" ? (
        <div className="flex space-x-4 overflow-x-auto pb-4 items-start scrollbar">
          {stages.map((stage) => {
            const stageClients = filteredClients.filter(c => c.stage === stage);
            
            return (
              <div key={stage} className="w-72 bg-white rounded-2xl border border-slate-200 p-4 shrink-0 flex flex-col min-h-[500px]">
                {/* Column title */}
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#25d366] inline-block"></span>
                    <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">{stage}</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-extrabold">
                    {stageClients.length}
                  </span>
                </div>

                {/* Column cards container */}
                <div className="space-y-3 flex-1">
                  {stageClients.map((client) => (
                    <div 
                      key={client.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#25d366]/40 hover:bg-white transition flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-slate-800">{client.name}</h4>
                          <button 
                            onClick={() => handleDeleteClient(client.id)}
                            className="text-slate-400 hover:text-red-500 p-0.5 opacity-0 group-hover:opacity-100 transition"
                            title="Delete Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[10px] text-slate-500 flex items-center space-x-1.5 mt-1 font-semibold">
                          <span>{client.propertyType}</span>
                          <span>·</span>
                          <span className="flex items-center text-slate-400">
                            <MapPin className="w-2.5 h-2.5 mr-0.5" />
                            {client.location}
                          </span>
                        </div>

                        {/* Preferred Config & AI score */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#25d366]/10 text-[#16c47f]">
                            {client.bhk}
                          </span>

                          <span className="text-[9px] font-extrabold text-[#16c47f] flex items-center space-x-0.5 bg-emerald-50 px-1.5 py-0.5 rounded">
                            <Sparkles className="w-3 h-3 text-[#25d366]" />
                            <span>AI Score: {client.aiScore}</span>
                          </span>
                        </div>
                      </div>

                      {/* Client Card interactive controls */}
                      <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex justify-between items-center">
                        <div>
                          <div className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Budget</div>
                          <div className="text-xs font-bold text-slate-900">{client.budget}</div>
                        </div>

                        {/* Direct contact quick action buttons */}
                        <div className="flex items-center space-x-1 text-slate-500">
                          <button 
                            onClick={() => alert(`Calling ${client.name} at ${client.phone}...`)}
                            className="p-1 hover:bg-slate-100 rounded hover:text-slate-800 transition"
                            title="Call Lead"
                          >
                            <PhoneCall className="w-3 h-3" />
                          </button>
                          
                          <button 
                            onClick={() => alert(`Opening WhatsApp Chat with ${client.name}...`)}
                            className="p-1 hover:bg-[#25d366]/10 rounded hover:text-[#25d366] transition"
                            title="WhatsApp Chat"
                          >
                            <MessageSquare className="w-3 h-3" />
                          </button>
                          
                          <button 
                            onClick={() => handleMoveStage(client.id, client.stage)}
                            className="p-1 hover:bg-slate-100 rounded hover:text-slate-800 transition"
                            title="Progress Stage"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageClients.length === 0 && (
                    <div className="h-28 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[10px]">
                      No leads here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs font-semibold text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Lead Details</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">RERA Preference</th>
                <th className="px-5 py-3">Budget</th>
                <th className="px-5 py-3">Stage</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-5 py-3">
                    <div className="font-bold text-slate-900">{client.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{client.phone}</div>
                  </td>
                  <td className="px-5 py-3">{client.propertyType}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] mr-1.5">{client.bhk}</span>
                    <span className="text-slate-500">{client.location}</span>
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-950">{client.budget}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      client.stage === "New" ? "bg-slate-100 text-slate-600" :
                      client.stage === "Interested" ? "bg-indigo-50 text-indigo-600" :
                      client.stage === "Site Visit" ? "bg-purple-50 text-purple-600" :
                      "bg-emerald-50 text-emerald-600"
                    }`}>
                      {client.stage}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <button 
                      onClick={() => handleMoveStage(client.id, client.stage)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold transition"
                    >
                      Move Stage
                    </button>
                    <button 
                      onClick={() => handleDeleteClient(client.id)}
                      className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Client Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-655 p-1 rounded-lg hover:bg-slate-50 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-[#0f172a] mb-4">Add Client Lead</h2>

            <form onSubmit={handleAddClient} className="space-y-4 text-xs font-semibold text-slate-400">
              <div className="space-y-1.5">
                <label className="block uppercase tracking-wider text-[10px]">Client Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#25d366] rounded-xl py-2.5 px-3 text-slate-800 placeholder-slate-400 outline-none text-sm font-medium transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block uppercase tracking-wider text-[10px]">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="98765 43210"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#25d366] rounded-xl py-2.5 px-3 text-slate-800 placeholder-slate-400 outline-none text-sm font-medium transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block uppercase tracking-wider text-[10px]">Property Type</label>
                  <select 
                    value={newClientProp}
                    onChange={(e) => setNewClientProp(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#25d366] rounded-xl py-2.5 px-3 text-slate-800 outline-none text-sm font-medium transition"
                  >
                    <option>Apartment</option>
                    <option>Plot</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block uppercase tracking-wider text-[10px]">Budget Limit</label>
                  <input 
                    type="text" 
                    required
                    placeholder="₹1.80 Cr"
                    value={newClientBudget}
                    onChange={(e) => setNewClientBudget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#25d366] rounded-xl py-2.5 px-3 text-slate-800 placeholder-slate-400 outline-none text-sm font-medium transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block uppercase tracking-wider text-[10px]">Config Preference</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3 BHK"
                    value={newClientBhk}
                    onChange={(e) => setNewClientBhk(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#25d366] rounded-xl py-2.5 px-3 text-slate-800 placeholder-slate-400 outline-none text-sm font-medium transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block uppercase tracking-wider text-[10px]">Preferred Area</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Kokapet"
                    value={newClientLoc}
                    onChange={(e) => setNewClientLoc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#25d366] rounded-xl py-2.5 px-3 text-slate-800 placeholder-slate-400 outline-none text-sm font-medium transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 text-sm font-bold">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-transparent text-slate-500 hover:text-slate-800 rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[#25d366] hover:bg-[#16c47f] text-white rounded-xl shadow-lg transition"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
