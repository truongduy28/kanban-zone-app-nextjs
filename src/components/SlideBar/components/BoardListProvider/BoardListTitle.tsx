import OverlayLoading from "@/components/Loading/OverlayLoading";
import { useCreateBoard } from "@/hooks/useBoardApi";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { BsPlusSquare } from "react-icons/bs";

const BoardListTitle = ({
  title,
  isCreateButton,
}: {
  title: string;
  isCreateButton?: boolean;
}) => {
  const queryClient = useQueryClient();
  // API to create new board
  const { mutate, isPending, error } = useCreateBoard();

  const onBoardCreate = useCallback(() => {
    mutate(undefined, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["getAllBoards"] }),
    });
  }, [mutate, queryClient]);

  return (
    <div className="flex items-center px-5">
      <p className="font-medium text-gray-500 flex-1">{title}</p>
      {isCreateButton && (
        <button onClick={onBoardCreate}>
          <BsPlusSquare size={20} color="gray" />
        </button>
      )}
      {isPending && <OverlayLoading />}
    </div>
  );
};
export default BoardListTitle;