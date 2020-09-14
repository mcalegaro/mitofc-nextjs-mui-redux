import { CircularProgress, Grid, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import { AddCircle, Clear, Save, Search } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectState as selectTeams, updateTeams } from '../../store/teams/reducer';
import { API_TEAMS } from '../constants';
import SelectTeamsListItem from './SelectTeamsListItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SelectTeamsList() {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [teamsList, setTeamsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const storedTeams = useSelector(selectTeams)
    const [selectedTeams, setSelectedTeams] = useState<any[]>([].concat(storedTeams))

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        setMsg('')
        if (name.length > 2) {
            setLoading(true)
            search()
        } else {
            setMsg('Digite ao menos 3 letras para pesquisar.')
        }
    }

    const search = async () => {
        const res = await fetch(API_TEAMS + name);
        const data = await res.json()
        setTeamsList(data.data)
        setLoading(false)
    }

    const handleSave = () => {
        dispatch(updateTeams(selectedTeams))
        handleClose()
    }

    const selectTeam = (e: any) => {
        e.preventDefault()
        let auxSave: any[] = [parseInt(e.target.name)];
        if (e.target.checked) {
            auxSave = auxSave.concat(selectedTeams)
        } else {
            auxSave = selectedTeams.filter(a => {
                return a !== (parseInt(e.target.name))
            })
        }
        setSelectedTeams(auxSave)
    }

    const cleanForm = () => {
        setName('')
    }

    return (
        <div>
            <Button //variant="outlined" color="primary" 
                startIcon={<AddCircle />}
                onClick={handleClickOpen} style={{ textTransform: 'initial' }}>
                Selecionar Times...
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Times
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave} startIcon={<Save />}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item xs={9} >
                            <TextField autoFocus id="searchTeam" label="Time" fullWidth
                                onChange={handleTeamNameChange} value={name} />
                        </Grid>
                        <Grid item xs={1} >
                            <Button startIcon={<Search />} type='submit' />
                        </Grid>
                        <Grid item xs={1} >
                            <Button startIcon={<Clear />} onClick={cleanForm} />
                        </Grid>
                    </Grid>
                </form>
                <List>
                    {!loading
                        ? teamsList.length > 0
                            ? (
                                teamsList.map((t: any) => {
                                    return <SelectTeamsListItem
                                        key={t.time_id}
                                        team={t}
                                        handleClick={selectTeam}
                                    />
                                })
                            )
                            : <div style={{textAlign:'center'}}>
                                {msg}
                            </div>
                        : <div style={{textAlign:'center'}}>
                            <CircularProgress />
                        </div>
                    }
                </List>
            </Dialog>
        </div>
    );
}