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
          bg-bg-card 
          border border-bg-border 
          text-text-primary
        `}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-black font-sans text-text-primary">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-text-secondary">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
