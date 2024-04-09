interface ToDoItemSummary {
  id: string,
  details: string,
  createdAt?: Date,
  updatedAt?: Date,
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}

function createApiResponse<T>(message: string, data: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data
  };
}

export {
  ApiResponse,
  createApiResponse,
  ToDoItemSummary
}
