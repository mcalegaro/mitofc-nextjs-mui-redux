import { Checkbox, CheckboxProps, Divider, FormControlLabel, ListItem } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { selectState as selectTeams } from '../../store/teams/reducer';
import TeamListItemSContent from "../TeamListItemSContent";

export default function SelectTeamsListItem(props: TeamCheckBoxProps) {

    const { team, handleClick } = props
    const storedTeams = useSelector(selectTeams)
    const [selected, setSelected] = useState(storedTeams.includes(parseInt(team.time_id)))

    const internalHandleClick = (e: any) => {
        setSelected(!selected)
        if (props.handleClick !== undefined) {
            e.target.checked = !selected
            e.target.name = props.id
            handleClick(e)
        }
    }

    return <>
        <ListItem button onClick={internalHandleClick}>
            <TeamListItemSContent team={team} />
            <FormControlLabel
                control={<Checkbox checked={selected}
                    name={`${team.time_id}`} color="primary" />}
                label=""
            />
        </ListItem>
        <Divider />
    </>
}

export interface TeamCheckBoxProps extends CheckboxProps {
    team: any,
    handleClick?: any
}