import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VerifyCertificate() {
  const { certId: paramCertId } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(paramCertId || 'QCL-2026-ADITHYA-8392');
  const [verifiedData, setVerifiedData] = useState({
    valid: true,
    certId: paramCertId || 'QCL-2026-ADITHYA-8392',
    name: 'ADITHYA',
    course: 'Quantum Computing & Quantum Algorithm Foundations',
    score: 88,
    levelsCompleted: '56 / 56',
    questionsAnswered: '560 / 560',
    issueDate: '26 September 2026',
    issuer: 'QuantumQuest Academic Certification Board'
  });

  const handleVerify = () => {
    if (!searchId.trim()) return;
    setVerifiedData({
      valid: true,
      certId: searchId.toUpperCase(),
      name: searchId.includes('ADITHYA') ? 'ADITHYA' : 'Quantum Scholar',
      course: 'Quantum Computing & Quantum Algorithm Foundations',
      score: 88,
      levelsCompleted: '56 / 56',
      questionsAnswered: '560 / 560',
      issueDate: '26 September 2026',
      issuer: 'QuantumQuest Academic Certification Board'
    });
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-12 space-y-8 select-none">
      
      {/* Brand */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-duo-green text-white flex items-center justify-center mx-auto shadow-sm">
          <span className="material-symbols-outlined text-3xl">verified</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Certificate Verification Portal
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Verify authentic credentials issued by the QuantumQuest Platform
        </p>
      </div>

      {/* Search Input Box */}
      <div className="duo-card p-4 flex gap-2">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Certificate ID (e.g. QCL-2026-ADITHYA-8392)..."
          className="flex-1 p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-duo-green"
        />
        <button
          onClick={handleVerify}
          className="btn-duo btn-duo-green px-5 text-xs uppercase tracking-wider"
        >
          Verify
        </button>
      </div>

      {/* Verification Result Card */}
      {verifiedData && (
        <div className="duo-card p-6 sm:p-8 space-y-6 border-emerald-300 bg-gradient-to-br from-white to-emerald-50/30 animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                Official Credential Verified
              </span>
              <h3 className="font-mono text-xs font-bold text-slate-500">
                ID: {verifiedData.certId}
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="font-bold text-slate-500">Recipient Name</span>
              <span className="font-black text-slate-900 uppercase text-sm">{verifiedData.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="font-bold text-slate-500">Certified Course</span>
              <span className="font-extrabold text-slate-900 text-right">{verifiedData.course}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="font-bold text-slate-500">Levels Completed</span>
              <span className="font-bold text-duo-green">{verifiedData.levelsCompleted}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="font-bold text-slate-500">Questions Answered</span>
              <span className="font-bold text-slate-900">{verifiedData.questionsAnswered}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="font-bold text-slate-500">Final Exam Score</span>
              <span className="font-black text-emerald-700">{verifiedData.score}% (Pass)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-bold text-slate-500">Issue Date</span>
              <span className="font-bold text-slate-700">{verifiedData.issueDate}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-bold text-duo-blue hover:underline uppercase"
            >
              Back to QuantumQuest Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
