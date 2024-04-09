import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// MUI
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

// Slice
import {
  searchToDoItems,
  createToDoItem,
  modifyToDoItem
} from './ListToDoItemsSlice'

function ListToDoItems() {
  // related to store
  const dispatch = useDispatch();
  const sliceState = useSelector((state) => state.listToDoItems)

  const [_isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [_isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [_id, setId] = useState("")
  const [_details, setDetails] = useState("")

  useEffect(() => {
    dispatch(searchToDoItems())
  }, [])

  const columns = [
    { field: 'id', headerName: 'Item ID', minWidth: 300, headerAlign: "center", sortable: true, align: "center", },
    { field: 'details', headerName: 'Item Details', flex: 1, headerAlign: "center", sortable: true, align: "center", },
    {
      field: 'action', headerName: 'Actions', minWidth: 110, headerAlign: "center", sortable: true, align: "center",
      renderCell: (params) => {
        return <Button
          variant='contained'
          onClick={(e) => {
            setId(params.row?.id);
            setDetails(params.row?.details);
            setIsModifyDialogOpen(true);
          }}
        >
          Modify
        </Button >
      }
    },
  ]

  return (
    <>
      <Dialog
        open={_isModifyDialogOpen}
        onClose={() => { setIsModifyDialogOpen(false); }}
        maxWidth="sm" fullWidth
      >
        <DialogTitle>
          Modify To-Do Item
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            value={_details}
            onChange={(e) => { setDetails(e.target.value) }}
            multiline rows="5"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: "0 1.5rem 1rem 0" }}>
          <Button
            onClick={() => {
              dispatch(modifyToDoItem({ id: _id, details: _details }));
              setId("");
              setDetails("");
              setIsModifyDialogOpen(false);
            }}
            variant='contained'
            autoFocus
          >
            Modify
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setId("");
              setDetails("");
              setIsModifyDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={_isCreateDialogOpen}
        onClose={() => { setIsCreateDialogOpen(false); }}
        maxWidth="sm" fullWidth
      >
        <DialogTitle>
          Create To-Do Item
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            value={_details}
            onChange={(e) => { setDetails(e.target.value) }}
            multiline rows="5"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: "0 1.5rem 1rem 0" }}>
          <Button
            onClick={() => {
              dispatch(createToDoItem({ details: _details }));
              setId("");
              setDetails("");
              setIsCreateDialogOpen(false);
            }}
            variant='contained'
            autoFocus
          >
            Create
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setId("");
              setDetails("");
              setIsCreateDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant='contained'
        onClick={() => {
          setIsCreateDialogOpen(true);
        }}
        sx={{ mt: "1rem" }}
      >
        Create New Item
      </Button>

      <DataGrid
        rows={sliceState?.toDoItems?.rows || []}
        columns={columns}
        loading={sliceState?.toDoItems?.isLoading}
        sx={{ m: "1rem 0" }}
        autoHeight
      />
    </>
  )
}

export default ListToDoItems