import React, { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'response' | 'error';
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-generic x86_64)', type: 'response' },
    { text: ' * Documentation:  https://help.ubuntu.com', type: 'response' },
    { text: ' * Management:     https://landscape.canonical.com', type: 'response' },
    { text: '', type: 'response' },
    { text: 'Last login: ' + new Date().toLocaleString() + ' from 192.168.1.15', type: 'response' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newLines: TerminalLine[] = [{ text: `gbonis@bonis:~/projects/about-me$ ${input}`, type: 'command' }];

    if (cmd === 'ls') {
      newLines.push({ text: 'README.md  node_modules  package.json  public  src  tailwind.config.js  vite.config.ts', type: 'response' });
    } else if (cmd === 'pwd') {
      newLines.push({ text: '/home/gbonis/projects/about-me', type: 'response' });
    } else if (cmd === 'whoami') {
      newLines.push({ text: 'gbonis', type: 'response' });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
      newLines.push({ text: '[sudo] password for gbonis: ', type: 'response' });
      newLines.push({ text: 'Nice try! But you have no power here.', type: 'error' });
    } else {
      newLines.push({ text: `bash: ${cmd}: command not found`, type: 'error' });
    }

    setHistory([...history, ...newLines]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#cccccc] font-mono text-[13px] selection:bg-[#264f78]">
      
      {/* VS Code Tabs Bar */}
      <div className="flex items-center bg-[#1e1e1e] border-b border-[#333333] px-4 h-9 space-x-6 text-[11px] uppercase tracking-wider shrink-0">
        <div className="cursor-pointer hover:text-white border-b border-transparent">Problems</div>
        <div className="cursor-pointer hover:text-white border-b border-transparent">Output</div>
        <div className="cursor-pointer hover:text-white border-b border-transparent">Debug Console</div>
        <div className="cursor-pointer text-white border-b border-white h-full flex items-center">Terminal</div>
        <div className="text-[#858585]">bash</div>
      </div>

      <div 
        className="flex-grow p-3 overflow-y-auto custom-scrollbar" 
        onClick={() => inputRef.current?.focus()}
        ref={scrollRef}
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-0.5 leading-relaxed break-all ${
            line.type === 'error' ? 'text-[#f85149]' : 
            line.type === 'command' ? 'text-white' : 'text-[#cccccc]'
          }`}>
            {line.type === 'command' ? (
              <div className="flex flex-wrap">
                <span className="text-[#4ade80] font-bold">gbonis@bonis</span>
                <span className="text-white">:</span>
                <span className="text-[#60a5fa] font-bold">~/projects/about-me</span>
                <span className="text-white">$ {line.text.split('$ ')[1]}</span>
              </div>
            ) : (
              line.text
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <form onSubmit={handleCommand} className="flex items-start mt-1">
          <div className="flex shrink-0">
            <span className="text-[#4ade80] font-bold">gbonis@bonis</span>
            <span className="text-white">:</span>
            <span className="text-[#60a5fa] font-bold">~/projects/about-me</span>
            <span className="text-white mr-2">$</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            className="flex-grow bg-transparent border-none outline-none text-white caret-white p-0 m-0 leading-tight"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>

      {/* VS Code Footer Bar */}
      <div className="bg-[#007acc] h-6 flex items-center px-3 text-white text-[11px] justify-between shrink-0">
        <div className="flex gap-3">
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer flex items-center gap-1">
            <span className="text-[10px]">main*</span>
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer">Ln 1, Col 1</span>
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer">UTF-8</span>
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer">TypeScript JSX</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;