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
                  <img alt="Profile picture of Katrina Jane R. Arco, a scholarship beneficiary" className="w-full h-full object-cover object-center" src="https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/4b85d9a86e069798981e8693d7ce111a.jpg" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Katrina Jane R. Arco</CardTitle>
                <p className="text-sm text-slate-500 text-center">22 years old, Mahacot Kanluran, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS Accountancy, 2024-2025</p>
                <p className="text-sm text-slate-500 text-center">Cum Laude, Dean's List (8 consecutive semesters)</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "Isang mapagpalang araw po. Lubos po akong nagpapasalamat sa REX Education Scholarship Program, sa pangunguna ni Hon. Beverley Rose Dimacuha at sa lahat ng bumubuo nito.
                  <br /><br />
                  I was fortunate po to become an automatic scholar simula Grade 7 hanggang sa makapagtapos ako ng college sa kursong BS Accountancy — bonus na lang din po ang pagiging Cum Laude.
                  <br /><br />
                  The program served as one of my most valuable support systems, providing assistance that was truly supplemental to my educational needs throughout my academic journey. I truly hope po that this initiative continues to grow and reach more students in need.
                  <br /><br />
                  Maraming salamat po, at nawa’y pagpalain pa po kayo ng Diyos."
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
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Yrielle Lyka M. De Castro</CardTitle>
                <p className="text-sm text-slate-500 text-center">21, El Sitio Subdivision, Dumantay, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS Nursing, Batangas State University, 2025</p>
                 <p className="text-sm text-slate-500 text-center">Cum Laude</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "With a heart full of gratitude, I am proud to say that I have been a REX Education scholar since I was in high school. This scholarship grant not only paid for my tuition and school expenses, but it also helped my parents by lessening the financial burden on our family, allowing me to focus more on my studies and dreams in life.
                  <br /><br />
                  Being a REX Education scholar was not just a big help for me, it was also a reminder that someone believed in me. This program of educational assistance empowers young individuals like me to overcome financial challenges and become an instruments of inspiration for others. Thank you so much for believing in students like me and giving us the opportunity to dream big despite life challenges.
                  <br /><br />
                  I will forever carry this honor not just for myself, but for every scholar who strives hard to be successful in life."
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
                <CardTitle className="text-xl font-bold text-slate-800 text-center">John Aeron A. Canatuan</CardTitle>
                <p className="text-sm text-slate-500 text-center">22, Purok 1, Kumintang Ilaya, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS Psychology, July 2025</p>
                <p className="text-sm text-slate-500 text-center">Magna Cum Laude</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "Lubos po akong nagpapasalamat sa REX Education Scholarship Program sa walang sawang suporta at tulong pinansyal na ibinigay sa akin sa loob ng sampung taon. Mula sa pagiging batch valedictorian noong elementarya, salutatorian noong senior high school, at ngayon ay nagtapos bilang Magna Cum Laude sa kolehiyo — hindi ko po mararating ang lahat ng ito kung wala ang tulong at tiwalang ibinigay ninyo sa akin.
                  <br /><br />
                  Tunay na ang REX Education Scholarship ay hindi lamang naging daan upang maipagpatuloy ko ang aking pag-aaral, kundi naging inspirasyon din upang patuloy akong magsikap at magtagumpay. Sa bawat hakbang ay kasama ko kayo — ang programang nagpatunay na ang isang batang nangangarap ay kayang makamit ang lahat kung may taong naniniwala sa kanyang kakayahan.
                  <br /><br />
                  Dalangin ko po na mas marami pa kayong batang Batangueño na mabigyan ng pagkakataong makamit ang kanilang mga pangarap — tulad ng ginawa ninyo para sa akin.
                  <br /><br />
                  Mula sa puso, maraming salamat po, REX Education Scholarship Program!"
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
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Marjonnel D. Panganiban</CardTitle>
                <p className="text-sm text-slate-500 text-center">23, Malitam, Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BA in Communication, University of Batangas, 2025</p>
                <p className="text-sm text-slate-500 text-center">Cum Laude, Top 8 CAS Graduating Student & other awards</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "Ako’y taos-pusong nagpapasalamat bilang isa sa mga mapalad na iskolar ng REX Education Scholarship Program. Mula pa noong 2014 hanggang sa aking pagtatapos sa kolehiyo, naging malaking tulong ang inyong ipinagkaloob na suporta bilang isang mag-aaral.
                  <br /><br />
                  Dahil sa programang ito, nabawasan ang bigat ng gastusin sa aking pamilya at nabigyan ako ng pagkakataong tutukan ng mas maigi ang aking pagaaral at mangarap ng mas malaki. Isa kayo sa naging dahilan kung bakit natupad ko ang isa sa pinakamalaki kong pangarap-ang makapagtapos ng kolehiyo.
                  <br /><br />
                  Maraming salamat po, Mayor, sa patuloy ninyong pagtitiwala at malasakit sa mga kabataang Batangueño, Hinding-hindi ko malilimutan ang tulong at oportunidad na inyong ibinahagi. Bitbit ko ang karangalang ito habang pinipilit kong makapagbigay rin ng ambag sa ating mahal na lungsod."
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
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Jeila Cassandra A. Olgado</CardTitle>
                <p className="text-sm text-slate-500 text-center">22, Sorosoro Ibaba Batangas City</p>
                <p className="text-sm text-slate-500 text-center">BS in Aircraft Maintenance Technology, 2025</p>
                <p className="text-sm text-slate-500 text-center">Magna Cum Laude</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow flex items-center justify-center">
                <p className="text-slate-700 italic text-center text-sm">
                  "I would like to express my heartfelt gratitude for the scholarship opportunity you have generously provided. Being selected as one of the grantees is truly an honor and a great help to me and my family. Your support motivates me to work even harder in pursuing my dreams, and I am deeply thankful for your dedication to education."
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
