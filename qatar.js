const token = "1f03d446703e470ba3bc872d47f6787c";
let baseUrl = "https://api.football-data.org/v4"

function getStandings()
{
    const url = `${baseUrl}/competitions/2000/standings`
    axios.get(url, {
        headers: {
            "X-Auth-Token": `${token}`
        }
    })
    .then((response) => {
        
        const standings = response.data.standings

        document.getElementById("standings").innerHTML = ""
        for(standing of standings)
        {
            let tableContent = ``

            for(row of standing.table)
            {
                tableContent += `
                    <li class="list-group-item">
                            <div class="row">
                                <!-- TEAM & KSA -->
                                <div class="col-lg-4 col-sm-4 d-flex align-items-center justify-content-center" style="text-align: center;">
                                    
                                    <span class="flag">
                                        <img 
                                            class="rounded-circle border border-2" 
                                            src="${row.team.crest}" 
                                            alt=""
                                            style="width: 40px; height: 40px; object-fit: cover"
                                        >
                                    </span>
                                    <h5 style="margin:auto 4px">${row.team.tla}</h5>
                                </div>
                                <!--// TEAM & KSA //-->
                                <!-- WIN -->
                                <div class="col-lg-2 col-sm-2">
                                    ${row.won}
                                </div>
                                <!--// WIN //-->
                                <!-- LOSS -->
                                <div class="col-lg-2 col-sm-2">
                                    ${row.lost}
                                </div>
                                <!--// LOSS //-->
                                
                                <div class="col-lg-2 col-sm-2">
                                    ${row.draw}
                                </div>
                                <div class="col-lg-2 col-sm-2">
                                    <b>${row.points}</b>
                                </div>
                            </div>
                            
                    </li>
                    <!--// TEAM //-->
                        `
            }

            const content = `
            <div class="col-lg-6" style="margin-top: 20px">
                <div class="card shadow border-none">
                    <div class="card-header bg-primary" style="text-align: center">
                        <b>${standing.group}</b>
                    </div>
                    <div class="row m-0 bg-secondary">
                        <div class="col-lg-4 col-sm-4" style="text-align: center;">
                            team
                        </div>
                        <div class="col-lg-2 col-sm-2">
                            W
                        </div>
                        <div class="col-lg-2 col-sm-2">
                            L
                        </div>
                        <div class="col-lg-2 col-sm-2">
                            D
                        </div>
                        <div class="col-lg-2 col-sm-2">
                            Pts
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">
                            ${tableContent}
                    </ul>
                </div>
            </div>
            `
            document.getElementById("standings").innerHTML += content
        }
    })
}

function getMatches()
{
    const url = `${baseUrl}/competitions/2000/matches`

    console.log(url, token)
    axios.get(url, {
        headers: {
            "X-Auth-Token": `${token}`
        }
    })
    .then((response) => {
        const matches = response.data.matches
        
        document.getElementById("matches").innerHTML = ""

        for(match of matches)
        {
            const homeTeam = match.homeTeam
            const awayTeam = match.awayTeam

            if(homeTeam.name == null)
            {
                continue
            }

            const comp = match.competition
            const dateUtc = match.utcDate
            const matchTime = new Date(dateUtc)
            const dateString = matchTime.getUTCFullYear() +"/"+ (matchTime.getUTCMonth()+1) +"/"+ matchTime.getUTCDate() + " " + matchTime.getUTCHours() + ":" + matchTime.getUTCMinutes() + ":" + matchTime.getUTCSeconds()
            

            
            const content = `
                <!-- MATCH COL -->
                <div class="col-lg-12" >
                    <div class="card shadow rounded-pill mt-5" style="overflow: hidden">                            
                        <!-- MATCH CARD -->
                        <div class="card-body p-0">
                            <div class="row">
                                <!-- FIRST TEAM COL -->
                                <div class="col-lg-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-right: solid 5px #5b0d25;">
                                    <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                                    
                                        <div>
                                            <div class="flag">
                                                <img 
                                                    class="rounded-circle border border-2" 
                                                    src="${homeTeam.crest}" 
                                                    alt=""
                                                    style="width: 40px; height: 40px; object-fit: cover"
                                                >
                                            </div>
                                            <h5 style="margin:auto 4px">${homeTeam.tla}</h5>
                                        </div>
                                    </div>
                                </div>
                                <!--// FIRST TEAM COL //-->
                                <!-- VERSUS COL -->
                                <div class="col-lg-6" style="text-align: center">
                                    <div class="row">
                                        <div class="col-lg-4" style="margin: auto 0px">
                                            <h3>
                                                ${match.score.fullTime.home ?? '-'}
                                            </h3>
                                        </div>
                                        <div class="col-lg-4">
                                            <h6>${match.group}</h6>
                                            <h1>X</h1>                                        
                                            <h6>${dateString}</h6>
                                        </div>
                                        <div class="col-lg-4" style="margin: auto 0px">
                                            <h3>
                                                ${match.score.fullTime.away ?? '-'}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <!--// VERSUS COL //-->
                                <!-- SECOND TEAM COL -->
                                <div class="col-lg-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-left: solid 5px #5b0d25;">
                                    <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                                    
                                        <div>
                                            <div class="flag">
                                                <img 
                                                    class="rounded-circle border border-2" 
                                                    src="${awayTeam.crest}" 
                                                    alt=""
                                                    style="width: 40px; height: 40px; object-fit: cover"
                                                >
                                            </div>
                                            <h5 style="margin:auto 4px">${awayTeam.tla}</h5>
                                        </div>
                                    </div>
                                </div>
                                <!--// SECOND TEAM COL //-->
                            </div>
                        </div>
                        <!--// MATCH CARD //-->
                    </div>
                </div>
                <!--// MATCH COL //-->
                
            `
            document.getElementById("matches").innerHTML += content
        }
    })
}

getStandings()
getMatches()