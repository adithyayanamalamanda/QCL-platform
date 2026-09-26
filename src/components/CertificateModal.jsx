import { useRef } from 'react';

export default function CertificateModal({
  userName = 'ADITHYA',
  score = 88,
  certId = 'QCL-2026-ADITHYA-8392',
  dateStr = '26 September 2026',
  onClose
}) {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border-2 border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Actions Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-duo-purple font-black text-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-xl">verified</span>
            <span>Official Quantum Certificate</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="btn-duo btn-duo-green px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div
          ref={printRef}
          className="relative bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 p-8 sm:p-12 rounded-3xl border-8 border-double border-slate-800 text-center space-y-6 shadow-inner"
        >
          {/* Watermark / Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-duo-green flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-3xl">science</span>
            </div>
            <div className="text-left">
              <span className="font-black text-2xl tracking-tight text-slate-900 block leading-tight">
                Quantum<span className="text-duo-green">Quest</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Interactive Quantum Algorithm Learning Platform
              </span>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Certificate of Completion
            </span>
            <p className="text-xs text-slate-600 font-medium">This certificate is proudly presented to</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-wide py-2 border-b-2 border-slate-300 max-w-md mx-auto">
              {userName}
            </h1>
          </div>

          <div className="space-y-2 max-w-lg mx-auto text-xs text-slate-700 font-medium leading-relaxed">
            <p>
              for successfully mastering and completing the comprehensive curriculum in
            </p>
            <h3 className="font-black text-base sm:text-lg text-indigo-950 uppercase tracking-wider">
              Quantum Computing & Quantum Algorithm Foundations
            </h3>
            <p className="text-[11px] text-slate-500">
              56 Interactive Levels • 560 Graded Questions • Final Comprehensive Examination
            </p>
          </div>

          {/* Certificate Metadata Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block">Final Score</span>
              <span className="font-black text-sm text-duo-green">{score}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block">Issued Date</span>
              <span className="font-bold text-xs text-slate-800">{dateStr}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block">Credential</span>
              <span className="font-bold text-xs text-indigo-600">Verified</span>
            </div>
          </div>

          {/* Signature & Verification Seal */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 max-w-lg mx-auto text-xs">
            <div className="text-left space-y-0.5">
              <div className="font-serif italic text-base text-slate-800 font-bold">QuantumQuest Academic Board</div>
              <div className="text-[10px] text-slate-400 font-mono">Verified Lead Instructor</div>
            </div>

            <div className="text-right space-y-0.5 font-mono text-[10px] text-slate-500">
              <div className="font-bold text-slate-700">ID: {certId}</div>
              <div>verify.quantumquest.org</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
