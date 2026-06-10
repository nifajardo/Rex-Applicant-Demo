import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const TestimonialsSection = () => {
  return (
    <>
      <Helmet>
        <title>Testimonials - REX Education Scholarship Program</title>
        <meta name="description" content="Read inspiring testimonials from beneficiaries of the REX Education Scholarship Program." />
        <meta property="og:title" content="Testimonials - REX Education Scholarship Program" />
        <meta property="og:description" content="Read inspiring testimonials from beneficiaries of the REX Education Scholarship Program." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-extrabold text-center" style={{color:"#1a1a2e",fontFamily:"Montserrat,sans-serif"}}>
          Inspiring Stories
        </h1>
        <p className="text-base text-center text-slate-500 max-w-2xl mx-auto">
          Hear directly from the students whose lives have been transformed by the REX Education Scholarship Program.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch justify-center">
          {/* Testimonial 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200 flex flex-col h-full">
              <CardHeader className="flex flex-col items-center p-6 pb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 flex items-center justify-center" style={{border:"4px solid #c0242d"}}>
                  <img alt="Profile picture of Katrina Jane R. Arco, a scholarship beneficiary" className="w-full h-full object-cover object-center" src="/linda-walker.png" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Linda Walker</CardTitle>
                <p className="text-sm text-slate-500 text-center">22 years old, Mahacot Kanluran, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS Secondary Education, 2024-2025</p>
                <p className="text-sm text-slate-500 text-center">Cum Laude, Dean's List (8 consecutive semesters)</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "Magandang araw po. Lubos po akong nagpapasalamat sa REX Education Scholarship Program at sa lahat ng taong naging bahagi ng programang ito.
                  <br /><br />
                  Bilang anak po ng isang magsasaka at maybahay, hindi naging madali ang aking pag-aaral. Maraming pagkakataon na kinailangan naming magtipid upang matustusan ang mga pangangailangan sa eskwela. Dahil po sa scholarship na ito, nabawasan ang aming mga alalahanin at mas nakapagpokus ako sa aking pag-aaral.
                  <br /><br />
                  Sa tulong ng programang ito, nakapagtapos po ako ng kursong BS Secondary Education at ngayon ay isa nang ganap na guro. Ang oportunidad na ibinigay ninyo ay naging daan upang maabot ko ang aking mga pangarap.
                  <br /><br />
                  Maraming salamat po sa inyong kabutihan at malasakit. Nawa'y mas marami pa po kayong kabataang matulungan sa mga susunod na taon."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200 flex flex-col h-full">
              <CardHeader className="flex flex-col items-center p-6 pb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 flex items-center justify-center" style={{border:"4px solid #c0242d"}}>
                  <img alt="Profile picture of Yrielle Lyka M. De Castro, a scholarship beneficiary" className="w-full h-full object-cover object-center" src="https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/1112a950c98683824791d86dcdb41123.jpg" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Shane B. Lawson</CardTitle>
                <p className="text-sm text-slate-500 text-center">21, El Sitio Subdivision, Dumantay, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS Nursing, Batangas State University, 2025</p>
                 <p className="text-sm text-slate-500 text-center">Cum Laude</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                "Isang mapagpalang araw po. Taos-puso po akong nagpapasalamat sa REX Education Scholarship Program para sa malaking tulong na aking natanggap sa buong panahon ng aking pag-aaral.
                <br /><br />
                Bilang isang estudyanteng nagmula sa simpleng pamilya, ang scholarship po na ito ay naging malaking biyaya. Nakatulong ito sa aking mga gastusin sa paaralan at nagbigay sa akin ng motibasyon upang pagbutihin pa ang aking akademikong pagganap.
                <br /><br />
                Nakatapos po ako ng BS Information Technology at ngayon ay nagtatrabaho bilang software developer. Malaking bahagi ng aking tagumpay ang suporta at tiwalang ipinagkaloob ng programang ito.
                <br /><br />
                Maraming salamat po sa patuloy na pagsuporta sa edukasyon ng mga kabataan. Pagpalain pa po kayo ng Diyos."
              </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200 flex flex-col h-full">
              <CardHeader className="flex flex-col items-center p-6 pb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 flex items-center justify-center" style={{border:"4px solid #c0242d"}}>
                  <img alt="Profile picture of John Aeron A. Canatuan, a scholarship beneficiary" className="w-full h-full object-cover object-center" src="https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/5b22c0b7e7a0ff3c5367325cc06a8ba7.jpg" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Mitchell L. Dela Cruz</CardTitle>
                <p className="text-sm text-slate-500 text-center">22, Purok 1, Kumintang Ilaya, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS Psychology, July 2025</p>
                <p className="text-sm text-slate-500 text-center">Magna Cum Laude</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "Magandang araw po. Ako po ay lubos na nagpapasalamat sa REX Education Scholarship Program sa pagkakataong maging isa sa mga iskolar nito.
                  <br /><br />
                  Noong ako po ay nasa kolehiyo, marami kaming pinagdaanang pagsubok sa pamilya lalo na sa aspetong pinansyal. Ang scholarship na ito ang naging isa sa mga dahilan kung bakit naipagpatuloy ko ang aking pag-aaral nang hindi nawawalan ng pag-asa.
                  <br /><br />
                  Sa awa ng Diyos, nakapagtapos po ako ng BS Accountancy at matagumpay na naipasa ang board examination. Ang inyong tulong ay naging mahalagang bahagi ng aking tagumpay.
                  <br /><br />
                  Maraming salamat po sa inyong malasakit at dedikasyon sa pagtulong sa mga estudyante. Nawa'y mas marami pa po kayong mabigyang inspirasyon at pag-asa."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial 4 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200 flex flex-col h-full">
              <CardHeader className="flex flex-col items-center p-6 pb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 flex items-center justify-center" style={{border:"4px solid #c0242d"}}>
                  <img alt="Profile picture of Marjonnel D. Panganiban, a scholarship beneficiary" className="w-full h-full object-cover object-center" src="https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/f8d2d0655365c8c04acd25d731441143.jpg" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Jonathan Alex T. Chua</CardTitle>
                <p className="text-sm text-slate-500 text-center">23, Malitam, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BA in Communication, University of Batangas, 2025</p>
                <p className="text-sm text-slate-500 text-center">Cum Laude, Top 8 CAS Graduating Student & other awards</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
               <p className="text-slate-700 italic text-center text-sm">
                "Isang mapagpalang araw po. Nais ko pong ipaabot ang aking taos-pusong pasasalamat sa REX Education Scholarship Program at sa lahat ng bumubuo nito.
                <br /><br />
                Bilang first-generation college student sa aming pamilya, napakalaking bagay po ng suportang aking natanggap. Hindi lamang ito nakatulong sa aking mga pangangailangang pang-eskwela kundi nagbigay rin ng inspirasyon upang magsikap nang higit pa.
                <br /><br />
                Dahil po sa pagkakataong ito, nakapagtapos ako ng kursong BS Civil Engineering at kasalukuyan nang nagtatrabaho sa propesyong aking pinangarap noon pa man.
                <br /><br />
                Maraming salamat po sa inyong patuloy na pagtulong sa mga estudyanteng tulad ko. Nawa'y patuloy pang lumawak ang programang ito upang mas marami pang pangarap ang matupad."
              </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial 5 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200 flex flex-col h-full">
              <CardHeader className="flex flex-col items-center p-6 pb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 flex items-center justify-center" style={{border:"4px solid #c0242d"}}>
                  <img alt="Profile picture of Jeila Cassandra A. Olgado, a scholarship beneficiary" className="w-full h-full object-cover object-center" src="https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/9d2ec39b0d4acbfd28584194777ab481.jpg" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Lovelynn K. Kapunan</CardTitle>
                <p className="text-sm text-slate-500 text-center">22, Sorosoro Ibaba Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS in Aircraft Maintenance Technology, 2025</p>
                <p className="text-sm text-slate-500 text-center">Magna Cum Laude</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "Magandang araw po. Lubos po akong nagpapasalamat sa REX Education Scholarship Program dahil naging bahagi ito ng aking tagumpay bilang estudyante.
                  <br /><br />
                  Sa mga panahong nahihirapan po kaming tustusan ang aking pag-aaral, ang scholarship na ito ang nagsilbing malaking suporta upang maipagpatuloy ko ang aking edukasyon nang may kapanatagan ng loob.
                  <br /><br />
                  Nakatapos po ako ng BS Nursing at ngayon ay nagsisilbi bilang isang registered nurse. Ang bawat hakbang ko patungo sa aking pangarap ay may kalakip na pasasalamat sa programang ito.
                  <br /><br />
                  Maraming salamat po sa inyong kabutihan at walang sawang suporta sa mga kabataang nangangarap. Nawa'y patuloy kayong pagpalain at gabayan sa inyong misyon."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default TestimonialsSection;
