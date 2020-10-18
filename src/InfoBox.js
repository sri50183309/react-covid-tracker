import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"
// card ui is coming from material UI

function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/* Title i.e. Coronovirus cases*/}
                <Typography className="infobox__title" color="textSecondary">  {title}  </Typography>

                {/* No of cases  +120K*/}
                <h2 className="infobox__cases"> {cases} </h2>

                {/* 1.2M total */}
                <Typography className="infobox__total" color="textSecondary">
                    {total} total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
