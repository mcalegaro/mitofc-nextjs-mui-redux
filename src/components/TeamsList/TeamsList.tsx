import AddTeamDialog from '../SelectTeams/SelectTeamsList'
import TeamsListItem from './TeamsListItem'
import { Divider, List, ListItem } from '@material-ui/core'

export default function TeamsList(props: any) {
    const { teams } = props

    const renderTeams = (teams: [any]) => {
        teams.sort((a, b) => {
            if (a.time.nome > b.time.nome) return 1
            if (a.time.nome < b.time.nome) return -1
            if (a.time.nome_cartola > b.time.nome_cartola) return 1
            if (a.time.nome_cartola - b.time.nome_cartola) return -1
            return 0
        })
        return teams ? teams.map(({ time }) => {
            return <TeamsListItem key={time.time_id} team={time} />
        }) : ''
    }

    return <>
        <List>
            <ListItem>
                <AddTeamDialog />
            </ListItem>
            <Divider />
            {renderTeams(teams)}
        </List>
    </>
}
