import React from 'react';

const InfoCard = ({ icon: Icon, label, value, isBoolean = false }) => {
  const displayValue = () => {
    if (value === null || value === undefined || value === '') return "Not set";
    if (isBoolean) return value ? "Yes" : "No";
    if (typeof value === 'string') {
        //return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value;
    }
    return value;
  };

  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        <Icon className="h-5 w-5 text-red-700" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-bold text-slate-800 break-words">{displayValue()}</p>
      </div>
    </div>
  );
};

export default InfoCard;