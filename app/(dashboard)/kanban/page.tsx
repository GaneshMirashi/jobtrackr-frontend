"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { useKanban } from "@/hooks/useKanban";
import { useMoveApplication } from "@/hooks/useMoveApplication";

const columns = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "WITHDRAWN",
];

export default function KanbanPage() {
  const { data, isLoading } = useKanban();
  const moveMutation = useMoveApplication();

  if (isLoading) return <div>Loading...</div>;

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If dropped in same place → ignore
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveMutation.mutate({
      id: Number(draggableId),
      status: destination.droppableId,
      position: destination.index,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6 overflow-x-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Kanban Board</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5 min-w-max items-start">

          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-72 bg-white border border-gray-200 rounded-2xl shadow-sm p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-800 text-sm tracking-wide">
                      {col}
                    </h2>

                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {data[col]?.length || 0}
                    </span>
                  </div>
                  {data[col]?.length === 0 && (
                    <div className="text-sm text-gray-400 text-center py-6 border border-dashed border-gray-200 rounded-xl">
                      No applications
                    </div>
                  )}

                  {data[col]?.map((app: any, index: number) => (
                    <Draggable
                      key={app.id}
                      draggableId={String(app.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing"
                        >
                          <h3 className="text-sm font-semibold text-gray-900">
                            {app.company_name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {app.job_title}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
}