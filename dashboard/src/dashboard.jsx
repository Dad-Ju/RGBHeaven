import React, { useState } from 'react'
import { socket } from './service/socket'
import AnimationTile from './animationTile'

function Dashboard() {
	let [tiles, setTiles] = useState([])

	socket.on('animations', (animationList) => {
		setTiles(animationList)
	})

	return tiles.length >= 1 ? (
		<>
			{tiles.map((ani) => (
				<AnimationTile animation={ani} />
			))}
		</>
	) : (
		'nothing to show right now'
	)
}

export default Dashboard
