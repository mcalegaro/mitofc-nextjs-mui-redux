import { Divider, ListItem, ListItemText } from '@material-ui/core'
import TeamListItemSContent from '../TeamListItemSContent'

export default function TeamsListItem(props: any) {

    const { team } = props

    const handleClick = () => { }

    return <>
        <ListItem button onClick={handleClick}>
            <TeamListItemSContent team={team} />
        </ListItem>
        <Divider />
    </>
}
