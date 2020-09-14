import { Avatar, Badge, ListItemAvatar, ListItemText } from "@material-ui/core";
import { SmallAvatar } from "./SmallAvatar";

export default function TeamListItemSContent(props: any) {
    const { team } = props
    return <>
        <ListItemAvatar>
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={<SmallAvatar alt={team.nome_cartola} src={team.foto_perfil} />}
            >
                <Avatar alt={team.nome} src={team.url_escudo_svg} />
            </Badge>
        </ListItemAvatar>
        <ListItemText primary={team.nome} secondary={team.nome_cartola} />
    </>
}