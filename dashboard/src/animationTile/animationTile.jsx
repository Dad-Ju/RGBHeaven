import PlayArrow from '@mui/icons-material/PlayArrow'
import PlaylistAdd from '@mui/icons-material/PlaylistAdd'
import Settings from '@mui/icons-material/Settings'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { socket } from '../service/socket'

function AnimationTile({ animation }) {
	const [args, setArgs] = useState(animation.args)

	const handleAnimationPlay = () => {
		socket.emit('setPlaylist', [{ name: animation.name, ...args }])
	}

	const updateArgs = ({ target }) => {
		let newVal

		switch (target.type) {
			case 'checkbox':
				newVal = target.checked
				break
			case 'number':
				newVal = parseInt(target.value)
				break
			default:
				newVal = target.value
		}

		const arg = target.id

		setArgs({ ...args, [arg]: newVal })
	}

	const openSettingsMenu = () => {}

	const addToPlaylist = () => {
		// JUST USE THAT AS PERMANENT FOR NOW
		// Should be handeld somewhere else ...
		socket.emit('setPlaylist', [{ name: animation.name, ...args }])
	}

	return (
		<Card sx={{ maxWidth: 346 }} id={animation.name}>
			<CardActionArea>
				<CardContent>
					<h1>{animation.name}</h1>
					<p> {animation.desc}</p>
					<Stack spacing={1} direction="row">
						<>
							{Object.keys(animation.args).map((arg) => {
								const val = animation.args[arg]
								const type =
									typeof val === 'string'
										? 'text'
										: typeof val
								return (
									<div id={`${animation.name}-${arg}`}>
										<p>{arg}</p>
										{type != 'boolean' ? (
											<TextField
												variant="outlined"
												placeholder={val}
												defaultValue={val}
												type={type}
												id={arg}
												readOnly={false}
												onInput={updateArgs}
											/>
										) : (
											<Switch
												size="medium"
												id={arg}
												onChange={updateArgs}
											/>
										)}
									</div>
								)
							})}
						</>
					</Stack>
					<br />
					<Stack spacing={2} direction="row">
						<Button
							variant="outlined"
							onClick={handleAnimationPlay}
						>
							<PlayArrow />
						</Button>
						<Button variant="outlined" onClick={openSettingsMenu}>
							<Settings />
						</Button>
						<Button variant="outlined" onClick={addToPlaylist}>
							<PlaylistAdd />
						</Button>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default AnimationTile
