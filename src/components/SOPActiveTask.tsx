"use client";
import React, { useState } from 'react';
import { CheckCircle, Circle, FolderOpen, Upload, ShieldCheck, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock SOP Data
const MOCK_SOP = {
    id: 'sop-001',
    title: 'New Client Onboarding Protocol',
    steps: [
        { id: 1, text: 'Confirm signed contract is in Dropbox', requiredType: 'checkbox' },
        { id: 2, text: 'Create Asana Board from Template "Launch V3"', requiredType: 'checkbox' },
        { id: 3, text: 'Request "Delegate Access" in Seller Central', requiredType: 'screenshot' },
        { id: 4, text: 'Run Initial Audit (Audit Engine)', requiredType: 'checkbox' },
    ]
};

export default function SOPActiveTask() {
    const [activeStep, setActiveStep] = useState(0); // Index
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const currentStep = MOCK_SOP.steps[activeStep];

    const handleCheck = () => {
        setCompletedSteps([...completedSteps, currentStep.id]);
        if (activeStep < MOCK_SOP.steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            handleCheck();
        }, 1500);
    };

    if (isComplete) {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
                <ShieldCheck className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-emerald-800 uppercase tracking-wide">Protocol Complete</h3>
                <p className="text-emerald-600 mb-6">SOP verified and logged to blockchain ledger (Simulated).</p>
                <Button onClick={() => { setIsComplete(false); setActiveStep(0); setCompletedSteps([]); }} variant="outline">
                    Reset Protocol
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-zinc-900 flex items-center">
                        <FolderOpen className="w-4 h-4 mr-2 text-zinc-400" />
                        {MOCK_SOP.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">Step {activeStep + 1} of {MOCK_SOP.steps.length} • Execution Mode</p>
                </div>
                <div className="text-xs font-mono bg-zinc-200 px-2 py-1 rounded text-zinc-600">ID: {MOCK_SOP.id}</div>
            </div>

            <div className="p-8">
                {/* Progress Bar */}
                <div className="w-full bg-zinc-100 h-2 rounded-full mb-8 overflow-hidden">
                    <div className="bg-zinc-900 h-full transition-all duration-500" style={{ width: `${(activeStep / MOCK_SOP.steps.length) * 100}%` }}></div>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-zinc-900 mb-2">Current Objective:</h4>
                        <p className="text-zinc-600 text-lg">{currentStep.text}</p>
                    </div>

                    <div className="flex-shrink-0 w-64">
                        {currentStep.requiredType === 'checkbox' ? (
                            <Button
                                onClick={handleCheck}
                                className="w-full h-16 text-lg font-bold bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg transition-transform hover:-translate-y-1"
                            >
                                <CheckCircle className="mr-2 h-6 w-6" /> Mark Complete
                            </Button>
                        ) : (
                            <Button
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="w-full h-16 text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform hover:-translate-y-1"
                            >
                                {isUploading ? (
                                    "Scanning Proof..."
                                ) : (
                                    <><Upload className="mr-2 h-6 w-6" /> Upload Proof</>
                                )}
                            </Button>
                        )}
                        <p className="text-[10px] text-center text-zinc-400 mt-2 uppercase tracking-wide">
                            {currentStep.requiredType === 'checkbox' ? 'Manual Confirmation' : 'Evidence Required'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Upcoming Steps */}
            <div className="bg-zinc-50 p-6 border-t border-zinc-100">
                <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Protocol Queue</h5>
                <div className="space-y-2 opacity-60">
                    {MOCK_SOP.steps.map((step, idx) => (
                        <div key={step.id} className={`flex items-center space-x-3 text-sm ${idx < activeStep ? 'text-zinc-400 line-through' : (idx === activeStep ? 'text-zinc-900 font-bold' : 'text-zinc-500')}`}>
                            {idx < activeStep ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                            <span>{step.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
