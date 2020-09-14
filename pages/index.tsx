import { CircularProgress } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_TEAM, EP_ST_MERCADO } from '../src/components/constants';
import StatusMarket from '../src/components/StatusMarket';
import TeamsList from '../src/components/TeamsList/TeamsList';
import { selectState as selectTeams } from '../src/store/teams/reducer';

export default function Index(data: any) {

  const ids = useSelector(selectTeams)
  const [teams, setTeams] = useState()
  const [loading, setLoading] = useState(false)

  const renderLogin = () => {
    // if (data.error === undefined && user.name === undefined) {
    //   return <LoginForm />
    // }
  }

  const tAux = teams ? teams.map(t => {
    if (t.time) {
      return t.time.time_id
    }
  }) : '';

  if (teams === undefined || JSON.stringify(tAux) != JSON.stringify(ids)) {
    Promise.all(
      ids.map(async (t) => {
        const res = await fetch(API_TEAM + t)
        const data = await res.json()
        const team = sanitizeTeam(data.data, t)
        return team
      })).then(res => {
        setTeams(res)
      })
  }

  function sanitizeTeam(team: any, t: any) {
    if (!team.time) {
      team.time = { nome: '' + t, nome_cartola: team.mensagem, time_id: t }
    }
    return team;
  }

  return (
    <div align="center">
      <StatusMarket data={data} />
      {/* <Link href="/about" >
            Go to the about page
            </Link> */}
      {/* {renderLogin()} */}
      {
        teams === undefined
          ? <CircularProgress />
          : <TeamsList teams={teams} />
      }
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(EP_ST_MERCADO)
  const data = await res.json()
  return { props: data };
}
