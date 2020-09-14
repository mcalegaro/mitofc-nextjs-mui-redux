import { Typography } from "@material-ui/core"

export default function StatusMarket(props: any) {
    return <div>
        {renderStatus(props.data)}
    </div>
}

const renderStatus: any = (data: any) => {
    if (data.error) {
        return (
            <>
                {data.error}
            </>
        )
    } else if (data.status_mercado != 4) {
        return (
            <div>
                < Typography variant="h6" component="h1" gutterBottom >
                    Rodada {data.rodada_atual}, mercado fecha {renderFechamento(data.fechamento)}
                </  Typography>
                {/* Times escalados: {data.times_escalados} */}
                {/* <br /> */}
            </div>
        )
    } else {
        return <>
            Mercado em manutenção.
        </>
    }
}

const renderFechamento: any = (fechamento: any) => {
    return leftPad(fechamento.dia) + '/' + leftPad(fechamento.mes) + '/' + fechamento.ano
        + ' - ' + leftPad(fechamento.hora) + ':' + leftPad(fechamento.minuto)
}

const leftPad = (value: string) => {
    return ('00' + value).slice(-2)
}