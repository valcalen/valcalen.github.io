const
	N_STUNDEN = 12,
	STUNDE_MITTAGSPAUSE = 7,

	TAGE = ["mo", "di", "mi", "do", "fr"],

	LK1 = "#e76f51", LK2 = "#f9d46a", LK3 = "#f4a261",
	GK1 = "#3aad9f", GK2 = "#8ab17d",
	SF = "#e0d29f"


var stundenplan, kurse


function main () {
	let klasse = (new URLSearchParams(location.search)).get("klasse")

	document.getElementsByTagName("title")[0].innerHTML = `Stundenplan ${klasse}`
	document.getElementById("klasse").innerHTML = klasse

	fetch(`kurslisten/${klasse}.json`)
	.then((data) => data.json())
	.then((json) => {
		kurse = json
		stundenplan = getStundenplan()

		faecherLaden()
		faecherGruppieren()
	})
}



function getStundenplan () {
	let kurseAuswahl = JSON.parse((new URLSearchParams(location.search)).get("kurse")),
		stundenplan = {"mo": [], "di": [], "mi": [], "do": [], "fr": []}

	for (let kursAuswahl in kurseAuswahl) {
		let kurs = kurse[kursAuswahl],
			farbe = kurseAuswahl[kursAuswahl]

		if (!kurs) {
			continue
		}

		for (let tag in kurs.stunden) {
			for (let stunde in kurs.stunden[tag]) {
				let raum = kurs.stunden[tag][stunde]
				
				if (raum) {
					stundenplan[tag][stunde] = {
						"kurs": kursAuswahl,
						"lehrkraft": kurs.lehrkraft,
						"raum": raum,
						"farbe": farbe
					}
				}
			}
		}
	}

	return stundenplan
}


function faecherLaden () {
	const stunden = document.getElementById("stundenplan").getElementsByTagName("tr")

	for (let stunde = 1; stunde <= 12; stunde++) {
		for (let tag of TAGE) {
			const fachInfo = stundenplan[tag][stunde - 1]
			let fachNode = document.createElement("td")

			if (fachInfo) {
				fachNode.innerHTML = `
					<b>${fachInfo.kurs}</b> ${fachInfo.lehrkraft}
					<br/>
					<i>${fachInfo.raum}</i>
				`
				fachNode.style.backgroundColor = fachInfo.farbe
				fachNode.classList.add(fachInfo.kurs)
			}
			else if (stunde == 7) {
				fachNode.innerHTML = "<b>Mittagspause</b>"
				fachNode.classList.add("mittagspause")
			}

			stunden[stunde].append(fachNode)
		}
	}
}


function faecherGruppieren () {
	const stunden = document.getElementById("stundenplan").getElementsByTagName("tr")

	let tagNr = 5
	for (let tagNr = 5; tagNr >= 1; tagNr--) {
		let letztesElement, letzterKurs, letzterRaum
		let stundenplanTag = stundenplan[TAGE[tagNr - 1]]

		for (let stundeNr = 1; stundeNr <= N_STUNDEN; stundeNr++) {
			let stunde = stundenplanTag[stundeNr - 1]
			let gruppieren = false


			if (stunde) {
				if (stunde.kurs == letzterKurs && stunde.raum == letzterRaum) {
					gruppieren = true
				}
			}
			else if (stundeNr == STUNDE_MITTAGSPAUSE) {
				letzterKurs = "mittagspause"
				continue
			}
			else if (letzterKurs == "") {
				gruppieren = true
			}


			if (gruppieren) {
				stunden[stundeNr].deleteCell(tagNr)
				letztesElement.rowSpan++
			}
			else {
				if (stunde) {
					letzterKurs = stunde.kurs
					letzterRaum = stunde.raum
				}
				else {
					letzterKurs = ""
				}

				letztesElement = stunden[stundeNr].cells[tagNr]
			}
		}
	}

	mittagspauseGruppieren()
}

function mittagspauseGruppieren () {
	const mittagspauseZeile = document.getElementById("stundenplan").getElementsByTagName("tr")[7]

	let letztesElement

	let tagNr = 5
	for (let tagNr = 5; tagNr >= 1; tagNr--) {
		let stunde = stundenplan[TAGE[tagNr - 1]][STUNDE_MITTAGSPAUSE - 1]


		if (stunde) {
			letztesElement = null
			continue
		}


		if (letztesElement) {
			mittagspauseZeile.deleteCell(tagNr)
			letztesElement.colSpan++
		}
		else {
			letztesElement = mittagspauseZeile.cells[tagNr]
		}
	}
}
