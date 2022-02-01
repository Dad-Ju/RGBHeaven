import PlayArrow from "@mui/icons-material/PlayArrow";
import Settings from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import React from "React";
import { socket } from "../service/socket";



function AnimationTile ({animation}) {
    const handleAnimationPlay = () => {
        socket.emit("setMode", { name: animation.name, args: animation.args })
    }

    return (
        <Card sx={{maxWidth: 346}}>
            <CardActionArea>
                <CardContent>
                    <h1>{ animation.name }</h1>
                    <p> { animation.desc }</p>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" onClick={handleAnimationPlay}><PlayArrow /></Button>
                        <Button variant="outlined" onClick={openSettingsMenu}><Settings /></Button>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AnimationTile;