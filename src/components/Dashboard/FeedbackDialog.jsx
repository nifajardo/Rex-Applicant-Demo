import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast'; // ✅ import toast
import actionCenter from "../../img/actioncenter.png";



const smileyOptions = [
  { value: 5, label: '😍', text: 'Lubos na sumasangayon' },
  { value: 4, label: '😊', text: 'Sumasangayon' },
  { value: 3, label: '😐', text: 'Walang Opinyon' },
  { value: 2, label: '😕', text: 'Hindi Sumasangayon' },
  { value: 1, label: '😠', text: 'Lubos na di sumasangayon' },
  { value: 0, label: 'N/A', text: 'Hindi Naaangkop' },
];

const feedbackQuestions = [
  { key: 'sqd0_satisfaction', text: 'Nasiyahan ako sa serbisyo na aking natanggap sa pangkalahatan.' },
  { key: 'sqd1_guidance_clarity', text: 'Malinaw sa akin ang mga proseso at gabay na aking ginugol para sa aplikasyon.' },
  { key: 'sqd2_document_alignment', text: 'Ang mga kinakailangang dokumento at ang mga hakbang ay batay sa impormasyong ibinigay.' },
  { key: 'sqd3_procedure_clarity', text: 'Ang mga hakbang sa pagpoproseso, kasama na ang pagbabayad (kung meron), ay simple at streamlined.' },
  { key: 'sqd4_info_accessibility', text: 'Madali at madaling makahanap ng impormasyon tungkol sa aking transaksyon mula sa opisina o sa website nito.' },
  { key: 'sqd5_service_accessibility', text: 'Ang serbisyo ay ibinigay ng libre (maglagay ng N/A kung may bayad).' },
  { key: 'sqd6_staff_helpfulness', text: 'Ang mga patakaran at opisyal ay patas, at lahat ng aplikante ay tinatrato nang may paggalang.' },
  { key: 'sqd7_rights_awareness', text: 'Nakuha ko ang kinakailangan ko mula sa tanggapan ng gobyerno, kung tinanggihan man, ito ay sapat na ipinaliwanag sa akin.' },
];

const requiredCCKeys = ['cc1_awareness', 'cc2_clarity', 'cc3_helpfulness'];
const requiredSQDKeys = feedbackQuestions.map(q => q.key);

const FeedbackDialog = ({ open, onOpenChange, onSubmit, isSubmitting }) => {
  const [feedback, setFeedback] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { toast } = useToast(); // ✅ hook for notifications

  useEffect(() => {
    const checkFormCompleteness = () => {
      const allCCAnswered = requiredCCKeys.every(key => feedback[key] !== undefined);
      const allSQDAnswered = requiredSQDKeys.every(key => feedback[key] !== undefined);
      setIsFormComplete(allCCAnswered && allSQDAnswered);
    };
    checkFormCompleteness();
  }, [feedback]);

  const handleRadioChange = (key, value) => {
    setFeedback(prev => ({ ...prev, [key]: value }));
  };

  const handleSmileyChange = (key, value) => {
    setFeedback(prev => ({ ...prev, [key]: parseInt(value, 10) }));
  };

  const handleTextChange = (key, value) => {
    setFeedback(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show the PDF immediately after clicking Submit
    window.dispatchEvent(new CustomEvent('showVeteransGuide')); 

    if (isFormComplete) {
      try {
        await onSubmit(feedback); // still submit feedback in the background

        // ✅ success toast
        toast({
          title: "Salamat sa iyong Feedback!",
          description: "Matagumpay na naisumite ang iyong sagot.",
        });

        // Close feedback dialog immediately
        onOpenChange(false);

        // Reset form
        setFeedback({});
        setIsFormComplete(false);
      } catch (error) {
        // Error toast (optional, since PDF already shown)
        toast({
          title: "Submission Failed",
          description: error.message || "May problema sa pag-submit. Pakisubukan muli.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <img
            alt="Official Feedback Form Header"
            className="w-full object-contain mb-4"
            // src="https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/e293a6b612eac12deefaead2ae6165a6.png"
            src={actionCenter}
          />
          <DialogTitle className="text-2xl text-primary text-center pt-4">
            TULUNGAN MO KAMI MAS MAPABUTI ANG AMING MGA PROSESO AT SERBISYO!
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-slate-600 px-4">
            Ang Client Satisfaction Measurement (CSM) ay naglalayong masubaybayan ang karanasan ng taumbayan hinggil sa kanilang pakikitransaksyon sa mga tanggapan ng gobyerno. 
            Makatutulong ang inyong kasagutan ukol sa inyong naging karanasan sa kakatapos lamang na transaksyon, upang mas mapabuti at lalong mapahusay ang aming serbisyo publiko. 
            Ang personal na impormasyon na iyong ibabahagi ay mananatiling kumpidensyal. Maaari ring piliin na hindi sagutan ang sarbey na ito.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="p-4 border rounded-lg">
            <p className="font-bold mb-4">
              PANUTO: Lagyan ng tsek (✓) ang iyong sagot sa mga sumusunod na katanungan tungkol sa Citizen's Charter (CC). 
              Ito ay isang opisyal na dokumento na naglalaman ng mga serbisyo sa isang ahensya/opisina ng gobyerno, 
              makikita rito ang mga kinakailangan na dokumento, kaukulang bayarin, at pangkabuuang oras ng pagproseso.
            </p>
          </div>

          {/* CC Questions */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div>
              <Label className="font-semibold">CC1. Alam mo ba ang CC at nakita ko ito sa napuntahang opisina?</Label>
              <RadioGroup onValueChange={(value) => handleRadioChange('cc1_awareness', value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Alam na" id="cc1-1" />
                  <Label htmlFor="cc1-1">1. Alam ko ang CC at nakita ko ito sa napuntahang opisina</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Hindi pa alam" id="cc1-2" />
                  <Label htmlFor="cc1-2">2. Hindi ko alam kung ano ang CC o wala akong nakitang opsiyon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Walang opinyon" id="cc1-3" />
                  <Label htmlFor="cc1-3">3. Walang opinyon</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="font-semibold">CC2. Kung alam ang CC, masasabi mo ba na ang CC nang napuntahang opisina ay...</Label>
              <RadioGroup onValueChange={(value) => handleRadioChange('cc2_clarity', value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Madaling makita" id="cc2-1" />
                  <Label htmlFor="cc2-1">1. Madaling makita</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medyo mahirap" id="cc2-2" />
                  <Label htmlFor="cc2-2">2. Medyo mahirap makita</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Hindi makita" id="cc2-3" />
                  <Label htmlFor="cc2-3">3. Hindi makita</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="N/A" id="cc2-4" />
                  <Label htmlFor="cc2-4">4. N/A</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="font-semibold">CC3. Kung alam ang CC, gaano nakatulong ang CC sa transaksyon mo?</Label>
              <RadioGroup onValueChange={(value) => handleRadioChange('cc3_helpfulness', value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sobrang nakatulong" id="cc3-1" />
                  <Label htmlFor="cc3-1">1. Sobrang nakatulong</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nakatulong naman" id="cc3-2" />
                  <Label htmlFor="cc3-2">2. Nakatulong naman</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Hindi nakatulong" id="cc3-3" />
                  <Label htmlFor="cc3-3">3. Hindi nakatulong</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="N/A" id="cc3-4" />
                  <Label htmlFor="cc3-4">4. N/A</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* SQD Questions */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left pb-2">
                      Panuto: Para sa SQD 0-8, lagyan ng tsek (✓) ang hanay na pinakaangkop sa iyong sagot.
                    </th>
                    {smileyOptions.map(opt => (
                      <th key={opt.value} className="p-2 text-center text-2xl">{opt.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feedbackQuestions.map(q => (
                    <tr key={q.key} className="border-t">
                      <td className="py-3 pr-2 text-sm">{q.text}</td>
                      {smileyOptions.map(opt => (
                        <td key={opt.value} className="text-center p-2">
                          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                            <input
                              type="radio"
                              name={q.key}
                              value={opt.value}
                              checked={feedback[q.key] === opt.value}
                              onChange={() => handleSmileyChange(q.key, opt.value)}
                              className="accent-primary h-5 w-5 cursor-pointer"
                            />
                          </motion.div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <Label htmlFor="suggestions" className="font-semibold">
              Mga mungkahi kung paano naming mapapabuti pa ang aming mga serbisyo (opsyonal):
            </Label>
            <Textarea
              id="suggestions"
              placeholder="Iyong mga mungkahi..."
              onChange={(e) => handleTextChange('suggestions', e.target.value)}
            />
          </div>

          <div className="space-y-2 p-4 border rounded-lg">
            <Label htmlFor="email" className="font-semibold">Email address (opsyonal):</Label>
            <Input
              id="email"
              type="email"
              placeholder="iyong.email@example.com"
              onChange={(e) => handleTextChange('email', e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!isFormComplete || isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? 'Nagsu-sumite...' : 'I-sumite ang Feedback'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
