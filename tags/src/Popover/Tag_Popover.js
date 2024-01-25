import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { IconButton, Button } from '@material-ui/core';

import AddTags from './Add_Tags';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const iconData = [
    { label: 'Tag 1', color: '#F44336' },
    { label: 'Tag 2', color: '#2196F3' },
];

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: '50%',
        backgroundColor: "#1374d6",
        color: theme.palette.common.white,
    },
    popoverContent: {
        // padding: theme.spacing(2),
    },
    header: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.blue.main,
        color: "#ffffff",
    },
    headerLabel: {
        fontSize: '1.2rem',
    },
    headerIcons: {
        display: 'flex',
        color: theme.palette.common.white
    },
    typography: {
        padding: theme.spacing(2),
    },
    listData: {
        padding: theme.spacing(2),
        maxHeight: '300px', // Set a maximum height for the list container
        overflowY: 'auto', // Enable vertical scrollbar if needed
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(1, 0),
        padding: theme.spacing(1, 0),
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    listItemLabel: {
        marginRight: theme.spacing(2),
        fontSize: '1rem',
        width: "250px",
        background: theme.palette.primary.main, // Set the background color
        padding: theme.spacing(1), // Add padding for better visual appearance
        borderRadius: theme.shape.borderRadius, // Optionally add border-radius
        color: theme.palette.common.white, // Set the text color to contrast
    },
    listItemIcons: {
        display: 'flex',
        gap: theme.spacing(1),
    },
    action: {
        padding: theme.spacing(1, 0),
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "25px"
    }
}));

export default function TagPopover() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [addTags, setAddTags] = React.useState(false);
    const [Tags, setTags] = React.useState([...iconData]);
    const [newTagName, setNewTagName] = React.useState("")
    const [newTagColor, setNewTagColor] = React.useState("")
    const [editTagIndex, setEditTagIndex] = React.useState()


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAdd = () => {
        setAddTags(true)
    }

    const onHandleInputChange = (e) => {
        console.log("onHandleInputChange", e.target.value);
        setNewTagName(e.target.value)
    }

    const handleChangeColor = (color) => {
        setNewTagColor(color.hex);
        console.log("handleChangeColor", color);
    }

    const handleTagClose = () => {
        setAddTags(false)
    }
    const handleTagSave = () => {
        console.log("handleTagSave:", newTagName, newTagColor);

        if (newTagName && newTagColor) {
            const indexToEdit = Tags.findIndex((tag, key) => key === editTagIndex);

            if (indexToEdit !== -1) {
                const updatedTags = [...Tags];
                updatedTags[indexToEdit].label = newTagName;
                updatedTags[indexToEdit].color = newTagColor;
                setTags(updatedTags);
                setNewTagName('');
                setNewTagColor('');
                setAddTags(false)
            } else {
                const newTag = { label: newTagName, color: newTagColor };
                setTags((prevTags) => [...prevTags, newTag]);
                // Clear input values after saving
                setNewTagName('');
                setNewTagColor('');
                setAddTags(false)
            }
        }
    }
    const handleTagDelete = (index) => {
        console.log("handleTagDelete:", index);
        const updatedTags = [...Tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    }
    const handleTagEdit = (index) => {
        const tagToEdit = Tags.find((tag, key) => key === index);
        console.log("handleTagEdit:", index, tagToEdit);
        setEditTagIndex(index)
        setNewTagName(tagToEdit.label);
        setNewTagColor(tagToEdit.color);
        setAddTags(true)


    }
    const tagActions = [
        <React.Fragment>
            <Button color="secondary" variant="text" onClick={handleTagClose} >Cancel</Button>
            {' '}
            <Button color="primary" variant="outlined" onClick={handleTagSave} >Save</Button>
        </React.Fragment>
    ]

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton
                className={classes.button}
                aria-label="Add"
                variant="contained"
                color="secondary"
                onClick={handleClick}
            >
                <AddIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.popoverContent}>
                    <div className={classes.header}>
                        <Typography variant="h6" className={classes.headerLabel}>
                            Tags
                        </Typography>
                        <div className={classes.headerIcons}>
                            <IconButton style={{ color: 'white' }}>
                                <DoneAllIcon />
                            </IconButton>
                            <IconButton style={{ color: 'white' }} onClick={handleAdd}>
                                <AddIcon />
                            </IconButton>
                            <IconButton style={{ color: 'white' }} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.listData}>
                        {Tags.map((item, index) => (
                            <div key={index} className={classes.listItem}>
                                <div
                                    className={classes.listItemLabel}
                                    style={{ background: item.color }}
                                >
                                    {item.label}
                                </div>
                                <div className={classes.listItemIcons}>
                                    <IconButton>
                                        <EditIcon onClick={() => { handleTagEdit(index) }} />
                                    </IconButton>
                                    <IconButton onClick={() => { handleTagDelete(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.action}>
                        <Button
                            variant="outlined"
                            color="primary"
                        // onClick={handleAddButtonClick} // Replace with your actual click handler
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </Popover>
            <AddTags tagOpen={addTags} onHandleInputChange={onHandleInputChange} handleChangeColor={handleChangeColor} handleTagClose={handleTagClose} tagName={newTagName} tagColor={newTagName} tagActions={tagActions} />

        </div>
    );
}
