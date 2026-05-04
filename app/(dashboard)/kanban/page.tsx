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
    <div className="p-6 overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-6">Kanban Board</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 min-w-max">

          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-64 bg-surface-muted p-3 rounded-xl"
                >
                  <h2 className="font-medium mb-3">{col}</h2>

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
                          className="bg-white p-3 rounded-lg mb-3 shadow-sm border border-surface-border"
                        >
                          <h3 className="text-sm font-medium">
                            {app.company_name}
                          </h3>
                          <p className="text-xs text-gray-500">
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