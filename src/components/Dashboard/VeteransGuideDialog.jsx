import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const PdfModal = ({ show, setShow, pdfUrl }) => {
    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent className="max-w-5xl h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Feedback Summary</DialogTitle>
                </DialogHeader>

                <div className="w-full h-full">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.12.313/build/pdf.worker.min.js">
                        <Viewer fileUrl={pdfUrl} />
                    </Worker>
                </div>

                <DialogFooter>
                    <Button onClick={() => setShow(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PdfModal;