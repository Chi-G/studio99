import React from 'react';

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-[#2A2A3A] rounded-2xl bg-[#111118]">
      <div className="w-16 h-16 rounded-full bg-[#1A1A28] flex items-center justify-center mb-6">
        {Icon && <Icon className="w-8 h-8 text-[#6C3CE1]" />}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-[#94A3B8] max-w-md mb-6">{description}</p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}
