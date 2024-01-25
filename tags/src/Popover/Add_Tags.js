import React from "react";

import { Dialog, TextField, Box, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import CirclePicker from "./CirclePicker";

const AddTags = ({ tagOpen, handleTagClose, onHandleInputChange, tagName, handleChangeColor, tagActions, ...rest }) => {
    return (
        <div>
            <Dialog
                open={tagOpen}
                onClose={() => handleTagClose}
                maxWidth="xs"
                title="Create Tag"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            {"Create Tag"}
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent >
                    <TextField fullWidth label="Tag Name" value={tagName} onChange={onHandleInputChange} required />
                    <Box style={{ display: "flex", justifyContent: "center", padding: "8%" }}>
                        <CirclePicker onChange={handleChangeColor} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    {tagActions.map((action, index) => (
                        React.cloneElement(action, { key: index })
                    ))}
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddTags;