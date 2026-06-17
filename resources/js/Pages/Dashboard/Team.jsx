import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import { AppModal } from '@/Components/ui/app-modal';
import { 
  DndContext, 
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, UploadCloud, CheckCircle2, GripVertical, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

// Helper component for Sortable Item
function SortableTask({ task, onUploadClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-[#1A1A28] border border-[#2A2A3A] rounded-xl p-4 group hover:-translate-y-1 hover:shadow-lg transition-all duration-200 relative ${isDragging ? 'shadow-2xl border-[#10B981]' : ''}`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-4 right-4 text-[#475569] hover:text-[#94A3B8] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <div className="mb-3">
        <span className="inline-block bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
          {task.service}
        </span>
        <h4 className="font-bold text-white mb-1 leading-tight">{task.client}</h4>
      </div>

      <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-medium mb-4">
        <Clock className="w-3.5 h-3.5" />
        {task.deadline}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#94A3B8]">Progress</span>
          <span className="text-[#10B981] font-bold">{task.progress}%</span>
        </div>
        <div className="w-full bg-[#111118] rounded-full h-1.5 overflow-hidden">
          <div className="bg-[#10B981] h-1.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
        </div>
      </div>

      <button 
        onClick={() => onUploadClick(task)}
        className="w-full py-2 bg-[#111118] border border-[#2A2A3A] hover:border-[#10B981]/50 hover:bg-[#10B981]/10 text-[#E2E8F0] hover:text-[#10B981] rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
      >
        <UploadCloud className="w-3.5 h-3.5" /> Upload Deliverable
      </button>
    </div>
  );
}

export default function TeamDashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Initial State Data
  const [tasks, setTasks] = useState({
    todo: [
      { id: 'task-1', client: 'C*** Corp', service: 'Branding', deadline: '2 Days Left', progress: 0 },
      { id: 'task-2', client: 'A*** Inc', service: 'Web Dev', deadline: '5 Days Left', progress: 20 },
    ],
    inProgress: [
      { id: 'task-3', client: 'S*** LLC', service: 'Video Edits', deadline: '1 Day Left', progress: 75 },
    ],
    done: [
      { id: 'task-4', client: 'P*** Ltd', service: 'Pitch Deck', deadline: 'Completed', progress: 100 },
    ]
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    { id: 'inProgress', title: 'In Progress', color: 'bg-[#6C3CE1]/10 text-[#6C3CE1] border-[#6C3CE1]/20' },
    { id: 'done', title: 'Review / Done', color: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    let activeContainer = null;
    let overContainer = null;

    Object.keys(tasks).forEach((key) => {
      if (tasks[key].find((item) => item.id === activeId)) activeContainer = key;
      if (tasks[key].find((item) => item.id === overId) || key === overId) overContainer = key;
    });

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      // Same column reordering
      const oldIndex = tasks[activeContainer].findIndex((item) => item.id === activeId);
      const newIndex = tasks[activeContainer].findIndex((item) => item.id === overId);

      setTasks((prev) => ({
        ...prev,
        [activeContainer]: arrayMove(prev[activeContainer], oldIndex, newIndex),
      }));
    } else {
      // Moving between columns
      const activeItem = tasks[activeContainer].find((item) => item.id === activeId);
      
      setTasks((prev) => {
        const next = { ...prev };
        next[activeContainer] = next[activeContainer].filter((item) => item.id !== activeId);
        
        // If dropped onto a specific item
        if (tasks[overContainer].find((item) => item.id === overId)) {
          const overIndex = next[overContainer].findIndex((item) => item.id === overId);
          next[overContainer].splice(overIndex, 0, activeItem);
        } else {
          // Dropped on empty column area
          next[overContainer].push(activeItem);
        }
        return next;
      });
      
      toast.success('Task status updated successfully.');
    }
  };

  const handleUploadClick = (task) => {
    setSelectedTask(task);
    setIsUploadModalOpen(true);
  };

  const submitDeliverable = (e) => {
    e.preventDefault();
    toast.success('Deliverable uploaded! Project Manager notified.');
    setIsUploadModalOpen(false);
  };

  return (
    <TeamLayout>
      <Head title="My Tasks | Team Hub" />

      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">My Tasks</h1>
        <p className="text-[#94A3B8]">Drag and drop tasks to update progress.</p>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start h-full">
          {columns.map((col) => (
            <div key={col.id} className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-4 min-h-[500px] flex flex-col">
              <div className={`px-3 py-1.5 rounded-lg border text-sm font-bold w-max mb-6 ${col.color}`}>
                {col.title} ({tasks[col.id].length})
              </div>
              
              {/* Droppable Area Context */}
              <SortableContext 
                id={col.id}
                items={tasks[col.id].map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 space-y-4">
                  {tasks[col.id].map((task) => (
                    <SortableTask 
                      key={task.id} 
                      task={task} 
                      onUploadClick={handleUploadClick} 
                    />
                  ))}
                  
                  {tasks[col.id].length === 0 && (
                    <div className="border-2 border-dashed border-[#2A2A3A] rounded-xl h-24 flex items-center justify-center text-[#475569] text-sm font-medium">
                      Drop here
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>

      <AppModal 
        open={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Deliverable"
      >
        {selectedTask && (
          <form onSubmit={submitDeliverable} className="mt-4 space-y-5">
            <div className="bg-[#111118] p-4 rounded-xl border border-[#2A2A3A]">
              <h4 className="font-bold text-white mb-1">For: {selectedTask.client}</h4>
              <p className="text-sm text-[#94A3B8]">Service: {selectedTask.service}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E2E8F0]">Deliverable File</label>
              <div className="border-2 border-dashed border-[#2A2A3A] hover:border-[#10B981] bg-[#111118] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-[#1A1A28] group-hover:bg-[#10B981]/10 flex items-center justify-center mb-4 transition-colors">
                  <UploadCloud className="w-6 h-6 text-[#94A3B8] group-hover:text-[#10B981] transition-colors" />
                </div>
                <p className="text-white font-medium mb-1">Click to upload final file</p>
                <p className="text-xs text-[#475569]">ZIP, PDF, MP4 or Figma Link (max. 500MB)</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E2E8F0]">Notes for Reviewer (Optional)</label>
              <textarea 
                rows="3"
                className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl p-4 text-white focus:outline-none focus:border-[#10B981] transition-colors resize-none"
                placeholder="Added the specific transitions requested..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#047857] text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Submit for Review
            </button>
          </form>
        )}
      </AppModal>

    </TeamLayout>
  );
}
