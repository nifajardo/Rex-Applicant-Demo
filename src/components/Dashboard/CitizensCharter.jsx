import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const charterImages = [
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/107522ecdd79c9cd0b6d619800a76ead.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/10f7e8c3afc407a99cdb7852204451ea.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/6e588bc39cf7ed64d35f9970d8d82f16.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/0386d9413095e8e34c89725f8bba3ae4.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/dc47b9f1e63d302a4cac51b1085a1ed4.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/d74be0e53b9ceae83e70cda711e85687.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/000484704d4c8d1c50e5c275fe1acf64.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/655cade5ba28ca5d28416153d811161f.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/1d0a3aba3ad034331407fd0c88c1da66.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/f8496401cca1307f17532bc090c61594.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/a582ce26b3d3e0c73d250b5e5553699b.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/eea68c1dd8e96ffd0fcc606d81b4cc60.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/8d93a6067899381e7f48b9c0bba9ac68.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/45c801409a978e6fc205eefc11275d84.png",
"https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/b231f3ae4f2380bfc9f9a2afba157aff.png",
  "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/7f2a570d8d796f36871163072d06f59f.png"
];

const CitizensCharter = () => {
  return (
    <Card className="bg-white border-slate-200">
      <CardHeader className="border-b border-slate-200 pb-4 px-6">
        <CardTitle className="text-primary">Citizen's Charter</CardTitle>
        <CardDescription className="text-slate-500">Information about our services and commitments.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[70vh] overflow-y-auto space-y-4 pr-2 rounded-lg border border-slate-200 p-2">
          {/* {charterImages.map((src, index) => (
            <img 
              key={index} 
              src={src} 
              alt={`Citizen's Charter Page ${index + 1}`} 
              className="w-full h-auto rounded-md shadow-lg"
            />
          ))} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CitizensCharter;