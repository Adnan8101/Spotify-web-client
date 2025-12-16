'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Copy, Check, ChevronDown, ChevronUp, Sparkles, Terminal, Code2, Command as CommandIcon, Zap, Box } from 'lucide-react';
import Link from 'next/link';

interface Command {
  name: string;
  description: string;
  aliases: string[];
  usage: string;
  examples: string[];
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  commands: Command[];
}

interface CommandsData {
  metadata: {
    totalCommands: number;
    totalCategories: number;
    botVersion: string;
    lastUpdated: string;
  };
  categories: Category[];
}

export default function CommandsPage() {
  const [commandsData, setCommandsData] = useState<CommandsData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/commands')
      .then(res => res.json())
      .then(data => setCommandsData(data))
      .catch(err => console.error('Failed to load commands:', err));
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleCard = (commandName: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(commandName)) {
      newExpanded.delete(commandName);
    } else {
      newExpanded.add(commandName);
    }
    setExpandedCards(newExpanded);
  };

  const filteredCommands = useMemo(() => {
    if (!commandsData) return [];
    return commandsData.categories
      .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
      .map(cat => ({
        ...cat,
        commands: cat.commands.filter(cmd =>
          cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cmd.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      }))
      .filter(cat => cat.commands.length > 0);
  }, [commandsData, selectedCategory, searchTerm]);

  if (!commandsData) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 blur-xl animate-pulse"></div>
            <div className="relative w-full h-full rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-center">
              <CommandIcon className="w-8 h-8 text-violet-400" />
            </div>
          </div>
          <p className="text-white/40 text-sm font-medium">Loading Commands</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white antialiased">
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/[0.03] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/[0.03] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/[0.02] rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-2xl">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="font-semibold text-[15px] tracking-tight">JDK Music</span>
            </Link>
            <div className="flex items-center gap-1">
              <Link 
                href="/commands" 
                className="px-4 py-2 rounded-xl bg-white/[0.06] text-[13px] font-medium text-white border border-white/[0.08]"
              >
                Commands
              </Link>
              <Link 
                href="/spotify/authorize" 
                className="px-4 py-2 rounded-xl text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
              >
                Connect Spotify
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></div>
              <span className="text-[13px] font-medium text-white/70">
                {commandsData.metadata.totalCommands} Commands • {commandsData.metadata.totalCategories} Categories
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
              <span className="block text-white mb-2">Command</span>
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                Reference
              </span>
            </h1>
            
            <p className="text-[17px] text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
              Comprehensive documentation for all bot commands. Search, filter, and copy with ease.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl bg-[#111111] border border-white/[0.08] overflow-hidden">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 pl-5">
                      <Search className="w-5 h-5 text-white/30" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search commands..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-4 py-4 bg-transparent text-white placeholder-white/30 focus:outline-none text-[15px] font-medium"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="flex-shrink-0 pr-5 text-white/30 hover:text-white/60 transition-colors"
                      >
                        <span className="text-sm">Clear</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]'
                }`}
              >
                All
              </button>
              {commandsData.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black'
                      : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Commands Grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pb-24">
        {filteredCommands.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-6">
              <Search className="w-7 h-7 text-white/20" />
            </div>
            <p className="text-white/40 text-[15px] font-medium mb-2">No commands found</p>
            <p className="text-white/25 text-[13px]">Try adjusting your search or filter</p>
          </div>
        ) : (
          filteredCommands.map(category => (
            <div key={category.id} className="mb-20">
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {category.name}
                  </h2>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    <Box className="w-3 h-3 text-white/30" />
                    <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wide">
                      {category.commands.length} {category.commands.length === 1 ? 'command' : 'commands'}
                    </span>
                  </div>
                </div>
                <p className="text-white/40 text-[14px]">{category.description}</p>
              </div>

              {/* Commands Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {category.commands.map(command => {
                  const isExpanded = expandedCards.has(command.name);
                  return (
                    <div
                      key={command.name}
                      className="group relative rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.12] transition-all duration-200 overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Command Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                                <Terminal className="w-3.5 h-3.5 text-white/50" />
                              </div>
                              <h3 className="text-[17px] font-bold text-white truncate">
                                /{command.name}
                              </h3>
                            </div>
                            {command.aliases.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {command.aliases.slice(0, 3).map((alias, idx) => (
                                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/40 font-mono border border-white/[0.06]">
                                    {alias}
                                  </span>
                                ))}
                                {command.aliases.length > 3 && (
                                  <span className="text-[11px] px-2 py-0.5 text-white/30">
                                    +{command.aliases.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleCopy(`/${command.name}`)}
                            className="flex-shrink-0 p-2 hover:bg-white/[0.06] rounded-lg transition-all duration-200 group/copy"
                            title="Copy command"
                          >
                            {copiedCommand === `/${command.name}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-white/30 group-hover/copy:text-white/60" />
                            )}
                          </button>
                        </div>

                        {/* Description */}
                        <p className="text-white/50 text-[13px] leading-relaxed mb-5">
                          {command.description}
                        </p>

                        {/* Usage */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-3 h-3 text-white/30" />
                            <span className="text-[11px] text-white/30 uppercase font-semibold tracking-wider">Usage</span>
                          </div>
                          <div className="relative group/usage">
                            <code className="block bg-[#0A0A0A] px-3.5 py-2.5 rounded-xl text-[13px] text-emerald-400 font-mono border border-white/[0.06] overflow-x-auto">
                              {command.usage}
                            </code>
                            <button
                              onClick={() => handleCopy(command.usage)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/[0.06] rounded-lg transition-all duration-200 opacity-0 group-hover/usage:opacity-100"
                              title="Copy usage"
                            >
                              {copiedCommand === command.usage ? (
                                <Check className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-white/40" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Examples */}
                        {command.examples.length > 0 && (
                          <div className="pt-4 border-t border-white/[0.06]">
                            <button
                              onClick={() => toggleCard(command.name)}
                              className="flex items-center justify-between w-full text-left group/toggle"
                            >
                              <div className="flex items-center gap-2">
                                <Code2 className="w-3.5 h-3.5 text-white/30" />
                                <span className="text-[12px] font-semibold text-white/50 group-hover/toggle:text-white/70 transition-colors">
                                  {command.examples.length} {command.examples.length === 1 ? 'Example' : 'Examples'}
                                </span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-white/30 transition-transform" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-white/30 transition-transform" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="mt-3 space-y-2">
                                {command.examples.map((example, idx) => (
                                  <div key={idx} className="relative group/example">
                                    <code className="block bg-[#0A0A0A] px-3 py-2 rounded-lg text-[12px] text-blue-400 font-mono border border-white/[0.06] overflow-x-auto pr-10">
                                      {example}
                                    </code>
                                    <button
                                      onClick={() => handleCopy(example)}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/[0.06] rounded transition-all duration-200 opacity-0 group-hover/example:opacity-100"
                                      title="Copy example"
                                    >
                                      {copiedCommand === example ? (
                                        <Check className="w-3 h-3 text-green-400" />
                                      ) : (
                                        <Copy className="w-3 h-3 text-white/40" />
                                      )}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-2xl mt-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-[15px]">JDK Music</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed max-w-sm">
                Premium Discord music bot with advanced features, crystal-clear audio quality, and seamless Spotify integration.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-3">
              <h3 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4">Navigation</h3>
              <div className="space-y-3">
                <Link href="/" className="block text-[14px] text-white/50 hover:text-white transition-colors">Home</Link>
                <Link href="/commands" className="block text-[14px] text-white/50 hover:text-white transition-colors">Commands</Link>
                <Link href="/spotify/authorize" className="block text-[14px] text-white/50 hover:text-white transition-colors">Connect Spotify</Link>
              </div>
            </div>
            
            {/* Bot Info */}
            <div className="md:col-span-3">
              <h3 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4">Bot Info</h3>
              <div className="space-y-3 text-[14px] text-white/50">
                <p>Version {commandsData.metadata.botVersion}</p>
                <p>{commandsData.metadata.totalCommands} Commands</p>
                <p>Updated {commandsData.metadata.lastUpdated}</p>
              </div>
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <h3 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4">Status</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[14px] text-white/50">All Systems Operational</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[13px] text-white/30">
              © 2024 JDK Music Bot. All rights reserved.
            </p>
            <p className="text-[13px] text-white/25">
              Made for Discord music lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
