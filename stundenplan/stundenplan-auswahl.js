const KURSE_ID = [
	"de", "en", "fr", "la", "sn", "ku", "mu", "ds",
	"ge", "ek", "pw", "re", "wn",
	"ma", "bi", "ch", "ph", "if",
	"sf",
	"sp"
]


var kurse, baender, selectBaender


let optionNodesErstellen = () => {
	for (let kursName of Object.keys(kurse).sort()) {
		let kurs = kurse[kursName]
		let fach = kursName.toLowerCase().substring(0, 2)
		
		fach = (fach == "rk" ? "re" : fach)

		let optionNode = document.createElement("option")
		optionNode.value = kursName
		optionNode.innerHTML = `${kursName} ${kurs.lehrkraft}`

		kurs.optionNode = optionNode
		document.getElementById(`${fach}-select`).appendChild(optionNode)
	}
}

let optionNodesLoeschen = () => {
	if (kurse) {
		for (let kursName in kurse) {
			if (kurse[kursName].optionNode) {
				kurse[kursName].optionNode.remove()
			}
		}
	}
}

let baenderErstellen = () => {
	let bandGeben = (tag, stunde, band) => {
		for (let kursName in kurse) {
			let kurs = kurse[kursName]

			if (kurs.band != null) {
				continue
			}

			if (kurs.stunden[tag][stunde]) {
				kurs.band = band
				baender[band].push(kursName)
			}
		}
	}


	for (let kursName in kurse) {
		let kurs = kurse[kursName]

		if (kurs.band != null) {
			continue
		}

		let band = baender.length
		kurs.band = band
		baender[band] = [kursName]

		for (let tag in kurs.stunden) {
			let stunden = kurs.stunden[tag]

			for (let stunde in stunden) {
				if (stunden[stunde]) {
					bandGeben(tag, stunde, band)
				}
			}
		}
	}
}

async function auswahlKlasse (klasse) {
	document.getElementById("generieren").disabled = !klasse

	optionNodesLoeschen()

	if (!klasse)
		return

	await fetch(`kurslisten/${klasse}.json`)
	.then((data) => data.json())
	.then((json) => {
		kurse = json
	})

	optionNodesErstellen()

	baender = []
	baenderErstellen()

	selectBaender = []

	console.log(kurse)
	console.log(baender)
}


function kursAuswaehlen (fach, kursName) {
	let bandStatusSetzen = (band, enabled) => {
		for (let kursName of baender[band]) {
			kurse[kursName].optionNode.disabled = !enabled
		}
	}


	if (selectBaender[fach]) {
		bandStatusSetzen(selectBaender[fach], true)
	}

	selectBaender[fach] = kurse[kursName].band

	bandStatusSetzen(selectBaender[fach], false)
}


function stundenplanGenerieren () {
	let klasse = document.getElementById("klasse-select").value
	let ausgewaehlt = {}

	for (let kursID of KURSE_ID) {
		let kurs = document.getElementById(`${kursID}-select`).value

		if (kurs != "") {
			let farbe = document
				.getElementById(`${kursID}-color`)
				.value
				.replaceAll("#", "%23")

			ausgewaehlt[kurs] = farbe
		}
	}

	window.open(
		`stundenplan.html?klasse=${klasse}&kurse=${JSON.stringify(ausgewaehlt)}`,
		"_self"
	)
}


function auswahlZuruecksetzen () {
	document.getElementById("auswahl-container").reset()
	document.getElementById("klasse-select").dispatchEvent(new Event('change'))
}



function main () {
	document.getElementById("klasse-select").onchange()
}
