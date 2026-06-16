import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog"

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg', 
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

export function AppModal({ 
  open, 
  onClose, 
  title, 
  description, 
  children, 
  size = 'md' 
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className={`
          ${sizeMap[size]} 
          bg-[#111118] 
          border border-[#2A2A3A] 
          text-white
        `}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold font-display text-white">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-[#94A3B8]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
